const { Router } = require('express');
const serverroutes = require('./server');
const clientroutes = require('./client');

const router = Router();

router.use('/api/v1/on-covid-19/', serverroutes);

router.use('/client', clientroutes);

module.exports = router;
