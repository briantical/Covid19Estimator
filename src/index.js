const path = require('path');
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const api = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define the template engine to use
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Access the public folder via static route
app.use('/static', express.static(path.join(__dirname, './../public')));

app.use('/.netlify/functions/index', api);

module.exports.handler = serverless(app);
