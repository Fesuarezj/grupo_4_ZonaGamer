var express = require('express');
var router = express.Router();

const userControllers = require('../controllers/userControllers');

router.get('/registro', userControllers.registro);
router.get('/login', userControllers.login);
router.get('/contacto', userControllers.contacto);


module.exports = router;
