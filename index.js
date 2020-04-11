const express = require('express');
const bodyParser = require('body-parser');
const servefavicon = require('serve-favicon');
const path = require('path');

const logger = require('./src/logger');
const api = require('./src/routes');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define the template engine to use
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/src/views'));

// Using the favicons
app.use(servefavicon(path.join(__dirname, '/public/favicon/favicon.ico')));

// Access the public folder via static route
app.use('/static', express.static(path.join(__dirname, '/public')));

app.use('/', api);

app.listen(PORT, () => logger.info('Covid19 Estimator started at ', new Date().toJSON()));
