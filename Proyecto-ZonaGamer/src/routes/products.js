var express = require('express');
var router = express.Router();

const productsControllers = require('../controllers/productsControllers');

router.get('/producto', productsControllers.producto);
router.get('/carrito', productsControllers.carrito);
router.get('/agregar', productsControllers.agregarProducto);

module.exports = router;