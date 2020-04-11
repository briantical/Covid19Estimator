const { Router } = require('express');
const serverroutes = require('./server');
const covid19ImpactEstimator = require('../estimator');

const router = Router();

router.use('/api/v1/on-covid-19/', serverroutes);

router.get('/', (req, res) => res.render('index'));

// Generate the estimate on submit form
router.post('/', (req, res) => {
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

module.exports = router;
