var express = require('express');
var router = express.Router();

//CONTROLADOR//
const userControllers = require('../controllers/userControllers');

//MIDDLEWARES//
const uploadFile= require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');

//FORMULARIO DE REGISTRO//
router.get('/registro', userControllers.registro);

//PROCESO DE REGISTRO//
router.post('/registro', uploadFile.single('imagenPerfil'), validations, userControllers.procesoRegistro);

//FORMULARIO DE LOGIN//
router.get('/login', userControllers.login);

//PROCESO DE LOGIN//
router.post('/login', userControllers.procesoLogin);

//PERFIL DE USUARIO//
router.get('/perfil/:userId', userControllers.perfil);

//EDITAR USUARIO//
router.get('/editar', userControllers.editar);

//FORMULARIO DE CONTACTO//
router.get('/contacto', userControllers.contacto);


module.exports = router;
