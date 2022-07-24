const express = require('express');
const router = express.Router();


const productsApiControllers = require('../../controllers/api/productsApiControllers');

/*** LISTADO PRODUCTOS ***/
router.get('/', productsApiControllers.index);

/*** DETALLE PRODUCTO ***/
router.get('/detalle/:ID_products', productsApiControllers.producto);


module.exports = router;