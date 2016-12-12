'use strict';

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
app.post('/users', (req, res) => {
  dbController.addToUser(req).then(() => {
    res.sendStatus(200);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

// retrieves user data
app.get('/users', (req, res) => {
  dbController.retrieveUserData(req).then(data => {
    res.status(200).send(data);
  }).catch(err => {
    res.status(500).send(err);
  });
});

// retrieves bot's set of questions
app.get('/bot/questions', (req, res) => {
  res.status(200).send(botQuestions);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
