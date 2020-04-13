const path = require('path');
const xml2js = require('xml2js');
const winston = require('winston');
const { Router } = require('express');
const responseTime = require('response-time');

// Lambda only allows you to write to the /tmp directory.
// const logger = require('simple-node-logger')
// .createSimpleLogger(path.join(__dirname, './logs.log'));

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.printf((info) => `${info.message}`),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, './logs.txt'), options: { flags: 'w' } })
  ]
});

const covid19ImpactEstimator = require('../estimator');

const serverroutes = Router();
serverroutes.use(responseTime({ suffix: false }));

serverroutes.post('/', (req, res) => {
  const data = req.body;
  res.set('Content-Type', 'application/json');
  res.json(covid19ImpactEstimator(data));
  logger.info(`POST\t\t/api/v1/on-covid-19/    \t\t200\t\t${Math.trunc(res.get('X-Response-Time')).toString().padStart(2, 0)}ms`);
});

serverroutes.post('/json', (req, res) => {
  const data = req.body;
  res.set('Content-Type', 'application/json');
  res.json(covid19ImpactEstimator(data));
  logger.info(`POST\t\t/api/v1/on-covid-19/json\t\t200\t\t${Math.trunc(res.get('X-Response-Time')).toString().padStart(2, 0)}ms`);
});

serverroutes.post('/xml', (req, res) => {
  const data = req.body;
  const builder = new xml2js.Builder();
  const xmlOutput = builder.buildObject(covid19ImpactEstimator(data));

  res.set('Content-Type', 'application/xml');
  res.send(xmlOutput);
  logger.info(`POST\t\t/api/v1/on-covid-19/xml \t\t200\t\t${Math.trunc(res.get('X-Response-Time')).toString().padStart(2, 0)}ms`);
});

serverroutes.get('/logs', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.sendFile(path.join(__dirname, './logs.txt'));
  logger.info(`GET \t\t/api/v1/on-covid-19/logs\t\t200\t\t${Math.trunc(res.get('X-Response-Time')).toString().padStart(2, 0)}ms`);
});

module.exports = serverroutes;
