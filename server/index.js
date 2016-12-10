const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dbController = require('./db/controller.js');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../client/app')));

app.post('/users', function(req, res) {
  dbController.addToUser(req)
    .then(function() {
      res.sendStatus(200);
    })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
});
