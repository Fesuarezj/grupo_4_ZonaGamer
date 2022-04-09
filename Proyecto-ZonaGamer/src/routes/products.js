var express = require('express');
var router = express.Router();

const productsControllers = require('../controllers/productsControllers');

router.get('/carrito', productsControllers.carrito);


module.exports = router;