var history = require('../models/history')
var moment = require('moment');
var request = require('request');
var requestSync = require('sync-request');
var _ = require('underscore');

// Get All records
exports.getForecastAllrecords = function(req,res){
    console.log('Get all records');
    history.find()
        .then(function(data){
            res.json(data);
        })
        .catch(function(){
            res.status(500).json({
                msg : 'something went wrong'
            })
        })
}

exports.getForecast = function(req,res){
    console.log('calling the forecast');
    var data = req.body
    //console.log(data)
    var historydate=moment(data.historydate, "MM-DD-YYYY")
    var startDate = moment(data.historydate, "MM-DD-YYYY")
    var week = data.historyweek
    var endDate = startDate.add(week, 'week')
    var forecastStartDate = moment(data.forecastdate, "MM-DD-YYYY")
    var forecastNumberOfWeeks = data.forecastweek
    var apiInput={}
    var finalResp = []
    
    var weekObj = {
        week: 0,
        unitSold: 0
    };
    var summaryObj = {
        month: '',
        year: '', 
        unitSold: 0
    }
    //forecastweek
    history.find({"date" : {"$gte": (historydate.format()), "$lte" : (endDate.format())}, "channel":data.channel})
        .then(function(Mongodata){
            console.log('inside the THen Mongo ');
            var groupData = _.groupBy(Mongodata,'itemNumber')
            Object.keys(groupData)
                .forEach(key => { 
                    var jsondata = []
                    var itemResp = {
                        itemNumber: '',
                        itemName: '', 
                        channel: '', 
                        methodology: '', 
                        history: [],
                        forecast: [], 
                        summary: []        
                    }
                    console.log('inside the For Each Key ');
                    itemResp.itemNumber = groupData[key][0].itemNumber
                    console.log ('Item Number is : ' + groupData[key][0].itemNumber);
                    itemResp.itemName = groupData[key][0].itemName
                    itemResp.channel = groupData[key][0].channel
                    itemResp.methodology = 'ARIMA'
                    groupData[key].forEach(x => {                        
                        var tmpdata = {date: '', unitSold: 0}
                        tmpdata.date = x.date;
                        tmpdata.unitSold =x.unitSold;
                        jsondata.push(tmpdata);
                    })
                    console.log(' Data Header :  ', itemResp);
                    
                    itemResp.history = weekFormat(jsondata);
                    var apiInput = {
                        "history":jsondata,
                        "historyStartDate":historydate.format('YYYY-MM-DD'),
                        "historyEndDate":endDate.format('YYYY-MM-DD'),
                        "forecastStartDate":forecastStartDate.format('YYYY-MM-DD'),
                        "forecastNumberOfWeeks":forecastNumberOfWeeks
                    };
                    console.log('Stringified Input : ', JSON.stringify(apiInput));

                    var response = requestSync('POST', 'http://127.0.0.1:5000/forecast',
                        {headers: {'Content-type': 'application/json'},
                        json: apiInput}
                    );                    
                    console.log('Response Body : ' + response.body);   
                    var respJson = JSON.parse(response.body);        
                    //console.log('Parsed Body : ' + respJson);            
                    itemResp.forecast = weekFormat(respJson);
                    itemResp.summary = getSummary(respJson);
                    console.log(' Final Push : ', itemResp);
                    finalResp.push(itemResp);
                });
            
            res.json(finalResp);
        })
        .catch(function(error){
            res.status(500).json({
                msg : 'something went wrong'
            })
            //res.json(error)
        })
}

function weekFormat(data) {
    console.log('inside the Weekwise Data ');
    weekwise = [];
    data.forEach((rec) => {
        weekno = moment(rec.date).week();
        var dateTemp = {week: '', unitSold: 0}
        dateTemp.week = weekno;
        dateTemp.unitSold = rec.unitSold;
        var existingweek = false;
        weekwise.forEach((w) => {
        if (w.week == weekno) {
        w.unitSold += rec.unitSold;
        existingweek = true;
        }
        });
        console.log('Added Week', dateTemp);
        if (!existingweek) {
            console.log(' ----Pushedb Week', dateTemp);
            weekwise.push(dateTemp);
        }
    });
    //console.log('Week is : ' + weekwise);
    return weekwise;
}

function getSummary(dateData) {

    console.log('inside the Summary Data ', dateData);
    let result = {
        summary: []
    }
    let monthData = {
        Jan: [],
        Feb: [],
        Mar: [],
        Apr: [],
        May: [],
        Jun: [],
        Jul: [],
        Aug: [],
        Sep: [],
        Oct: [],
        Nov: [],
        Dec: []
    }
    let years = [];
    for (let target of dateData) {
        var date = new Date(target.date);
        var shortMonthName = new Intl.DateTimeFormat("en-US", {
            month: "short"
        }).format;
        var shortName = shortMonthName(date);
        const year = date.getFullYear();
        target.year = year;
        if (!years.includes(year)) {
            years.push(year);
        }
        //console.log('Month pushed : ', target);
        monthData[shortName].push(target);
    }
    for (year of years) {
        for (month of Object.keys(monthData)) {
            yearData = monthData[month].filter(date => date.year === year);
            let sum = 0;
            for (item of yearData) {
                sum = sum + item.unitSold;
            }
            if (sum > 0) {
                let temp = {
                    year,
                    "month": month,
                    "unitSold": sum
                }
               // console.log('Year pushed : ', temp);
                result.summary.push(temp);
            }
        }
    }
    return result.summary;
}