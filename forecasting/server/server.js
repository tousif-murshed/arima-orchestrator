const express = require('express'),
  path = require('path'),
  history = require('./models/history'),
  mongoose = require('mongoose'),
  cors = require('cors'),  
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3500;

let initAPI = (app) => {
  console.log('Starting API');

  app.get('/api/mongo', (req, res) => {
    mongoose.connect('mongodb+srv://default:gIt0f8tDqjnvnJfr@cluster0-um8zf.azure.mongodb.net/history?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true });
    history.find({}).exec((err, history) => {
      if (err) {
        console.log("FAILED to connect Mongo db server", "Error: " + err);

        res.status(500).send("Error occured");
      } else {
        res.status(200).send(history);
      }
    });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
  })
};


let initMiddleware = (app) => {

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/favicon.ico', express.static(__dirname + '/favicon.ico'));
  app.use('/', express.static(__dirname + '/../dist'));
  app.listen(port, () => {
    console.log('Listening on port ' + port);
  });
};

let init = () => {
  let app = express();
  initMiddleware(app);
  initAPI(app);
};

init();
