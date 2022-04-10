var express = require('express');
var router = express.Router();

const productsControllers = require('../controllers/productsControllers');

router.get('/producto', productsControllers.producto);
router.get('/carrito', productsControllers.carrito);


module.exports = router;