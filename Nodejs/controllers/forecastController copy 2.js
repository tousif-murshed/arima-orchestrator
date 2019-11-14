var history = require('../models/history')
var moment = require('moment');
var request = require('request');
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
    //forecastweek
    history.find({"date" : {"$gte": (historydate.format()), "$lte" : (endDate.format())}, "channel":data.channel})
        .then(function(Mongodata){
            console.log('inside the THen Mongo ');
            var groupData = _.groupBy(Mongodata,'itemNumber')
            Object.keys(groupData)
                .forEach(key => { 
                    var jsondata = []
                    groupData[key].forEach(x => {
                        var tmpdata = {date: '', unitSold: 0}
                        tmpdata.date = x.date;
                        tmpdata.unitSold =x.unitSold;
                        jsondata.push(tmpdata);
                    })
                    
                    var apiInput = {
                        "history":jsondata,
                        "historyStartDate":historydate.format('YYYY-MM-DD'),
                        "historyEndDate":endDate.format('YYYY-MM-DD'),
                        "forecastStartDate":forecastStartDate.format('YYYY-MM-DD'),
                        "forecastNumberOfWeeks":forecastNumberOfWeeks
                    };
                    console.log('Stringified Input : ', JSON.stringify(apiInput));

                    request.post({
                        "headers": { "content-type": "application/json" },
                        "url": "http://127.0.0.1:5000/forecast",
                        "body": JSON.stringify(apiInput)
                    }, (error, response, body) => {
                        if(error) {
                            return console.dir(error);
                        }
                        else {
                            console.log('res is : ', response.body)
                            res.json(body)
                        }
                    });
                    
                });
            
            //res.json(Mongodata);
        })
        .catch(function(error){
            res.status(500).json({
                msg : 'something went wrong'
            })
            //res.json(error)
        })
}