const express = require('express');
const router = express.Router();

const mainApiControllers = require('../../controllers/api/mainApiControllers');

router.get('/', mainApiControllers.home);

module.exports = router;

