const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname + '/../client/app')));

app.listen(3000);
console.log('Navigate to localhost:3000')
