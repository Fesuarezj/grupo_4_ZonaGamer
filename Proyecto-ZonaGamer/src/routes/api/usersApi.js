var express = require('express');
var router = express.Router();

//CONTROLADOR//
const userApiControllers = require('../../controllers/api/userApiControllers');

//MIDDLEWARES//
// const uploadFile = require('../middlewares/multerMiddleware');
// const validationsRegistro = require('../middlewares/validateRegisterMiddleware');
// const validationsLogin = require('../middlewares/validateLoginMiddleware');
// const guestMiddleware = require('../middlewares/guestMiddleware');
// const guestMiddlewareLogin = require('../middlewares/guestMiddlewareLogin');
const authMiddleware = require('../../middlewares/authMiddleware');

//LISTADO DE USUARIOS//
router.get('/', userApiControllers.listado);

//PERFIL DE USUARIO//
router.get('/perfil/:ID_usuario', authMiddleware,  userApiControllers.perfil);

module.exports = router;
