// Convert period tupes 'weeks', 'months' to the default 'days'
const dayConverter = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'weeks':
      return timeToElapse * 7;
    case 'months':
      return timeToElapse * 30;
    default:
      return timeToElapse;
  }
};

// Estimate the number of severe positive cases the will require hospitalization
const getSevereCases = (infectionsByRequestedTime) => {
  const percent = 15 / 100;
  const severeCasesByRequestedTime = percent * infectionsByRequestedTime;
  return Math.trunc(severeCasesByRequestedTime);
};

// Estimate the number of available hospital beds for severe patients
const getHpBeds = (totalHospitalBeds, severeCasesByRequestedTime) => {
  const percent = 35 / 100;
  const hospitalBedsByRequestedTime = (percent * totalHospitalBeds) - severeCasesByRequestedTime;
  return Math.trunc(hospitalBedsByRequestedTime);
};

// Estimate the number of severe +ve covid cases requiring ICU care
const getICUcases = (infectionsByRequestedTime) => {
  const percent = 5 / 100;
  const casesForICUByRequestedTime = percent * infectionsByRequestedTime;
  return Math.trunc(casesForICUByRequestedTime);
};

// Estimate the number of severe +ve cases requiring ventilators
const getVentilatorcases = (infectionsByRequestedTime) => {
  const percent = 2 / 100;
  const casesForVentilatorsByRequestedTime = percent * infectionsByRequestedTime;
  return Math.trunc(casesForVentilatorsByRequestedTime);
};

// Estimate how much money the economy will lose over a given period
const getDollarsFlight = (infectionsByRT, avgDailyIncomePop, avgDailyIncomeInUSD, timeToElapse) => {
  const dollarsInFlight = infectionsByRT * avgDailyIncomePop * avgDailyIncomeInUSD * timeToElapse;
  return Math.round(dollarsInFlight * 100) / 100;
};

const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    totalHospitalBeds,
    region: {
      avgDailyIncomeInUSD: avgIncome, avgDailyIncomePopulation: avgPop
    }
  } = data;

  let { timeToElapse } = data;
  timeToElapse = dayConverter(periodType, timeToElapse);

  const factor = Math.floor(timeToElapse / 3);

  const impact = {};
  const severeImpact = {};

  // impact:{} the best case estimation
  // Challenge 1
  impact.currentlyInfected = reportedCases * 10;
  const { currentlyInfected: lowCurrent } = impact;

  impact.infectionsByRequestedTime = lowCurrent * (2 ** factor);

  // Challenge 2
  const { infectionsByRequestedTime: lowInfections } = impact;
  impact.severeCasesByRequestedTime = getSevereCases(lowInfections);

  const { severeCasesByRequestedTime: lowCases } = impact;
  impact.hospitalBedsByRequestedTime = getHpBeds(totalHospitalBeds, lowCases);

  // Challenge 3
  impact.casesForICUByRequestedTime = getICUcases(lowInfections);
  impact.casesForVentilatorsByRequestedTime = getVentilatorcases(lowInfections);
  impact.dollarsInFlight = getDollarsFlight(lowInfections, avgIncome, avgPop, timeToElapse);

  // severImpact:{} the severe case estimation
  // Challenge 1
  severeImpact.currentlyInfected = reportedCases * 50;
  const { currentlyInfected: highCurrent } = severeImpact;
  severeImpact.infectionsByRequestedTime = highCurrent * (2 ** factor);

  // Challenge 2
  const { infectionsByRequestedTime: highInfections } = severeImpact;
  severeImpact.severeCasesByRequestedTime = getSevereCases(highInfections);

  const { severeCasesByRequestedTime: highCases } = severeImpact;
  severeImpact.hospitalBedsByRequestedTime = getHpBeds(totalHospitalBeds, highCases);

  // Challenge 3
  severeImpact.casesForICUByRequestedTime = getICUcases(highInfections);
  severeImpact.casesForVentilatorsByRequestedTime = getVentilatorcases(highInfections);
  severeImpact.dollarsInFlight = getDollarsFlight(highInfections, avgIncome, avgPop, timeToElapse);

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
