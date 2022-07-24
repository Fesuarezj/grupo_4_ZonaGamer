var express = require('express');
var router = express.Router();

//CONTROLADOR//
const userControllers = require('../controllers/userControllers');

//MIDDLEWARES//
const uploadFile = require('../middlewares/multerMiddleware');
const validationsRegistro = require('../middlewares/validateRegisterMiddleware');
const validationsLogin = require('../middlewares/validateLoginMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const guestMiddlewareLogin = require('../middlewares/guestMiddlewareLogin');
const authMiddleware = require('../middlewares/authMiddleware');

//LISTADO DE USUARIOS//
router.get('/', userControllers.listado);

//FORMULARIO DE REGISTRO//
router.get('/registro', guestMiddleware, userControllers.registro);

//PROCESO DE REGISTRO//
router.post('/registro', uploadFile.single('imagenPerfil'), validationsRegistro, userControllers.procesoRegistro);

//FORMULARIO DE LOGIN//
router.get('/login', guestMiddlewareLogin, userControllers.login);

//PROCESO DE LOGIN//
router.post('/login',validationsLogin, userControllers.procesoLogin);

//PERFIL DE USUARIO//
router.get('/perfil/:ID_usuario', authMiddleware,  userControllers.perfil);

//LOGOUT//
router.get('/logout/', userControllers.logout);

//EDITAR USUARIO//
router.get('/editar/:ID_usuario', userControllers.editar);
router.post('/editar/:ID_usuario', uploadFile.single('imagenPerfil'), userControllers.actualizar); 

//FORMULARIO DE CONTACTO//
router.get('/contacto', userControllers.contacto);


module.exports = router;
