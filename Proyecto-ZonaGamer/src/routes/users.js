var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const userControllers = require('../controllers/userControllers');

const { body } = require('express-validator');
const req = require('express/lib/request');

//MIDDLEWARES
const guestMiddleware = require('../middlewares/guestMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const validations = [
    body('imagenPerfil').custom((value, { req }) =>{
        const file = req.file;
        const acceptedExtensions = ['.jpg', '.png', '.gif']
        
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            const fileExtension = path.extname(file.originalname)            

            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo pemitidas son ${acceptedExtensions.join(', ')}`);
            } 
        }              
        return true;
    }),
    body('nombre').notEmpty().withMessage('Debes poner tu nombre'),
    body('apellido').notEmpty().withMessage('Debes poner tu apellido'),
    body('userName').notEmpty().withMessage('Crea un nombre de usuario'),
    body('correoElectronico')
    .notEmpty().withMessage('Debes poner un correo').bail()
    .isEmail().withMessage('Debes escribir un formaro de correo váliddo'),
    body('contrasenia')
    .notEmpty().withMessage('Debes poner una contraseña').bail()
    .isLength({min: 8}).withMessage('Debe contener al menos 8 caracteres')
]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/images/avatars');
    },
    filename: (req, file, cb) => {
        
        const avatars  = `${Date.now()}_img${path.extname(file.originalname)}`; 
        
        cb(null, avatars);
    }
});

const uploadFile = multer({ storage: storage });

//FORMULARIO DE REGISTRO
router.get('/registro', guestMiddleware, userControllers.registro);

//PROCESAR REGISTRO
// router.post('/registro', uploadFile.single('imagenPerfil'), validations, userControllers.procesoRegistro);
router.post('/registro', uploadFile.single('imagenPerfil'), validations, userControllers.procesoRegistro);

//FORMULARIO DE LOGIN
router.get('/login', guestMiddleware, userControllers.login);

//PROCESO DE LOGIN
router.post('/login', userControllers.procesoLogin);

//PERFIL DE USUARIO
router.get('/perfil', authMiddleware, userControllers.perfil);

//CERRAR SESION
router.get('/logout', userControllers.logout);

//FORMULARIO DE CONTACTO
// router.get('/contacto', userControllers.contacto);


module.exports = router;
