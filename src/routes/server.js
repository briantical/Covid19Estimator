const path = require('path');
const xml2js = require('xml2js');
const { Router } = require('express');
const responseTime = require('response-time');

// Lambda only allows you to write to the /tmp directory.
const logger = require('simple-node-logger').createSimpleLogger(path.join(__dirname, './logs.log'));

const covid19ImpactEstimator = require('../estimator');

const serverroutes = Router();

serverroutes.use(responseTime());
logger.setLevel('info');


// Define the server routes with an optional paramter 'format'
// You make paramters optional by adding the '?' after the paramter definition
serverroutes.post('/:format?', (req, res) => {
  const { format } = req.params;

  const data = req.body;
  const builder = new xml2js.Builder();
  const xmlOutput = builder.buildObject(covid19ImpactEstimator(data));

  switch (format) {
    case 'json':
      res.set('Content-Type', 'application/json');
      res.json(covid19ImpactEstimator(data));
      logger.info(`GET\t\t/api/v1/on-covid-19/json\t\tdone in ${res.get('X-Response-Time')}`);
      break;
    case 'xml':
      res.set('Content-Type', 'application/xml');
      res.send(xmlOutput);
      logger.info(`GET\t\t/api/v1/on-covid-19/xml \t\tdone in ${res.get('X-Response-Time')}`);
      break;
    case 'logs':
      res.set('Content-Type', 'text/plain');
      res.sendFile(path.join(__dirname, './logs.log'));
      break;
    default:
      res.set('Content-Type', 'application/json');
      res.json(covid19ImpactEstimator(data));
      logger.info(`GET\t\t/api/v1/on-covid-19/    \t\tdone in ${res.get('X-Response-Time')}`);
      break;
  }
});

module.exports = serverroutes;
