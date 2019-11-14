var history = require('../models/history')
var moment = require('moment');
var request = require('request');

// Get All records
exports.getForecastAllrecords = function(req,res){
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

exports.connect = function(req, res) {

    var val1 = [{
        _id: "5dc4c9fe7e21cecd411cca31",
        week: "1",
        date: "2019-01-01 00:00:00",
        itemNumber:"1000111",
        channel:"111",
        unitSold:"1100"
    }];

   request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://127.0.0.1:5000/forecast",
        "body": JSON.stringify(val1)
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        else {
            res.json(body)
        }
        console.dir(JSON.parse(body));
    });
 
}

exports.getForecast = function(req,res){
    var data = req.body
    
    var startDate = moment(data.date)
    var week = data.week
    var endDate = startDate.add(week, 'week')

    history.find({"date" : {"$gte": (data.date), "$lte" : (endDate.format())}, "channel":data.channel})
        .then(function(data){
            console.log('getforcast called')
            var val='{"_id":"5dc4c9fe7e21cecd411cca31","week":1,"date":"2019-01-01 00:00:00","itemNumber":"1000111","channel":"111","unitSold":1100}'
            var val1 = [{
                _id: "5dc4c9fe7e21cecd411cca31",
                week: "1",
                date: "2019-01-01 00:00:00",
                itemNumber:"1000111",
                channel:"111",
                unitSold:"1100"
            }];
            
            console.log('calling arima with val : ', val)
            request.post('http://127.0.0.1:5000/forecast', val)
            .then(function (resp) {
                console.log('Request Called')
                res.json(res);
            })
            .catch(function(err){
                console.log(err)
                res.json(err)
            })
            // res.json(data);
        })
        .catch(function(error){
            // res.status(500).json({
            //     msg : 'something went wrong'
            // })
            res.json(error)
        })
}