const { Router } = require('express');
// require('pug');
const covid19ImpactEstimator = require('../estimator');

const clientroutes = Router();

clientroutes.get('/', (req, res) => res.render('index'));

// Generate the estimate on submit form
clientroutes.post('/', (req, res) => {
  const {
    name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation
  } = req.body;
  const region = {
    name,
    avgAge: parseFloat(avgAge),
    avgDailyIncomeInUSD: parseFloat(avgDailyIncomeInUSD),
    avgDailyIncomePopulation: parseFloat(avgDailyIncomePopulation)
  };
  const {
    periodType, timeToElapse, reportedCases, population, totalHospitalBeds
  } = req.body;

  const estimate = covid19ImpactEstimator({
    region, periodType, timeToElapse, reportedCases, population, totalHospitalBeds
  });
  res.render('estimate', { estimate });
});

module.exports = clientroutes;
