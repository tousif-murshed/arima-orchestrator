var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var apiRouter = require('./routes/api');
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser:true, useUnifiedTopology:true},
    function(err){
    if(!err){
        console.log('DB Connected');
    }
    else{
        console.log(err)
    }
});
var app = express();    

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get('/', function(req,res){
    res.send('Default Route');
})

app.use('/api', apiRouter);

module.exports = app;
