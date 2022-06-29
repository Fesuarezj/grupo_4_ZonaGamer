var express = require('express');
var router = express.Router();

//CONTROLADOR//
const userControllers = require('../controllers/userControllers');

//MIDDLEWARES//
const uploadFile= require('../middlewares/multerMiddleware');
const validationsRegistro = require('../middlewares/validateRegisterMiddleware');
const validationsLogin = require('../middlewares/validateLoginMiddleware');

//FORMULARIO DE REGISTRO//
router.get('/registro', userControllers.registro);

//PROCESO DE REGISTRO//
router.post('/registro', uploadFile.single('imagenPerfil'), validationsRegistro, userControllers.procesoRegistro);

//FORMULARIO DE LOGIN//
router.get('/login', userControllers.login);

//PROCESO DE LOGIN//
router.post('/login',validationsLogin, userControllers.procesoLogin);

//PERFIL DE USUARIO//
router.get('/perfil/:userId', userControllers.perfil);

//EDITAR USUARIO//
router.get('/editar', userControllers.editar);

//FORMULARIO DE CONTACTO//
router.get('/contacto', userControllers.contacto);


module.exports = router;
