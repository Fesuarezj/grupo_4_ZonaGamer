var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const productsControllers = require('../controllers/productsControllers');

const uploadFile= require('../middlewares/multerMiddlewareProducts');

/*** LISTADO PRODUCTOS ***/
router.get('/', productsControllers.index);

/*** DETALLE PRODUCTO ***/
router.get('/detalle/:ID_products', productsControllers.producto);

/*** BUSCAR PRODUCTO ***/
router.get('/buscar', productsControllers.buscarProducto);
router.post('/buscar', productsControllers.encontrarProducto);

/*** CARRITO PRODUCTO ***/
router.get('/carrito', productsControllers.carrito);

/*** AGREGAR PRODUCTO ***/
router.get('/agregar', productsControllers.agregarProducto);
router.post('/agregar', uploadFile.single('imagenProducto'), productsControllers.store); 

/*** EDITAR PRODUCTO ***/
router.get('/editar/:id', productsControllers.editarProducto);
router.put('/:id', productsControllers.actualizar); 

/*** ELIMINAR PRODUCTO ***/ 
router.delete('/:id', productsControllers.destroy); 

module.exports = router;