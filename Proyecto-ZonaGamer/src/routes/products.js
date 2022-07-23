var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const productsControllers = require('../controllers/productsControllers');

const uploadFile= require('../middlewares/multerMiddlewareProducts');
const validations = require('../middlewares/validateAgregarProductoMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const buscarProductoMiddleware = require('../middlewares/validatebuscarProductoMiddleware');

/*** LISTADO PRODUCTOS ***/
router.get('/', productsControllers.index);

/*** DETALLE PRODUCTO ***/
router.get('/detalle/:ID_products', productsControllers.producto);

/*** BUSCAR PRODUCTO ***/
router.get('/buscar',productsControllers.buscarProducto);
router.post('/buscar',buscarProductoMiddleware, productsControllers.encontrarProducto);

/*** FILTRAR PRODUCTO ***/
router.get('/filtar/:ID_category', productsControllers.filtarPorCategoria);

/*** CARRITO PRODUCTO ***/
router.get('/carrito', productsControllers.carrito);

/*** AGREGAR PRODUCTO ***/
router.get('/agregar', authMiddleware, productsControllers.agregarProducto);
router.post('/agregar', uploadFile.single('imagenProducto'), validations,  productsControllers.store); 

/*** EDITAR PRODUCTO ***/
router.get('/editar/:ID_products', productsControllers.editarProducto);
router.post('/editar/:ID_products', uploadFile.single('imagenProducto'), productsControllers.actualizar); 

/*** ELIMINAR PRODUCTO ***/ 
router.post('/borrar/:ID_products', productsControllers.delete); 


module.exports = router;