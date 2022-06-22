var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const productsControllers = require('../controllers/productsControllers');

const uploadFile= require('../middlewares/multerMiddlewareProducts');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/images');
//     },
//     filename: (req, file, cb) => {
//         // console.log(file);
//         const nuevoNombreImagen = file.fieldname + '-' + Date.now() + path.extname(file.originalname); 
//         // console.log(nuevoNombreImagen);
//         cb(null, nuevoNombreImagen);
//     }
// });

// const uploadFile = multer({ storage: storage });

/*** LISTADO PRODUCTOS ***/
router.get('/', productsControllers.index);

/*** DETALLE PRODUCTO ***/
router.get('/detalle/:id/', productsControllers.producto);

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