const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dbController = require('./db/controller.js');
const botResponses = require('./botResponses.js')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../client/app')));

app.post('/users', function(req, res) {
  dbController.addToUser(req)
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(error) {
      res.status(500).send(error);
    })
});

app.get('/bot/responses', function(req, res) {
  res.status(200).send(botResponses);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
});
