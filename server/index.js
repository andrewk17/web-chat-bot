const express = require('express'),
  app = express(),
  path = require('path'),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser'),
  dbController = require('./db/controller.js'),
  botQuestions = require('./config.js');

// JSON parsing middleware
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname + '/../client/public')));

// records user data
app.post('/users', function(req, res) {
  dbController.addToUser(req).then(function() {
    res.sendStatus(200);
  }).catch(function(error) {
    res.status(500).send(error);
  })
});

// retrieves user data
app.get('/users', function(req, res) {
  dbController.retrieveUserData(req).then(function(data) {
    res.status(200).send(data);
  }).catch(function(err) {
    res.status(500).send(err);
  })
})

// retrieves bot's set of questions
app.get('/bot/questions', function(req, res) {
  res.status(200).send(botQuestions);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
});
