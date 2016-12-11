const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dbController = require('./db/controller.js');
const botResponses = require('./botResponses.js')

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../client/public')));

app.post('/users', function(req, res) {
  dbController.addToUser(req)
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(error) {
      res.status(500).send(error);
    })
});

app.get('/users', function(req, res) {
  dbController.retrieveUserData(req)
    .then(function(data) {
      res.status(200).send(data);
    })
    .catch(function(err) {
      res.status(500).send(err);
    })
})

app.get('/bot/responses', function(req, res) {
  res.status(200).send(botResponses);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
});
