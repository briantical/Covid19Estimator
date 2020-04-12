const path = require('path');
const xml2js = require('xml2js');
const { Router } = require('express');
const responseTime = require('response-time');

// Lambda only allows you to write to the /tmp directory.
const logger = require('simple-node-logger').createSimpleLogger('/tmp/covid.log');

const covid19ImpactEstimator = require('../estimator');

const serverroutes = Router();

serverroutes.use(responseTime());
logger.setLevel('info');


// Define the server routes with an optional paramter 'format'
// You make paramters optional by adding the '?' after the paramter definition
serverroutes.get('/:format?', (req, res) => {
  const { format } = req.params;

  const output = covid19ImpactEstimator(req.body);
  const builder = new xml2js.Builder();
  const xmlOutput = builder.buildObject(output);

  switch (format) {
    case 'json':
      res.json({ output });
      logger.info(`GET\t\t/api/v1/on-covid-19/json\t\t200\t\t${res.get('X-Response-Time')}`);
      break;
    case 'xml':
      res.set('Content-Type', 'text/xml');
      res.send(xmlOutput);
      logger.info(`GET\t\t/api/v1/on-covid-19/xml \t\t200\t\t${res.get('X-Response-Time')}`);
      break;
    case 'logs':
      res.set('Content-Type', 'text/plain');
      res.sendFile(path.join(__dirname, '/tmp/covid.log'));
      break;
    default:
      res.json({ output });
      logger.info(`GET\t\t/api/v1/on-covid-19/    \t\t200\t\t${res.get('X-Response-Time')}`);
      break;
  }
});

module.exports = serverroutes;
