
const { body } = require('express-validator');

module.exports = [   
    body('userName').notEmpty().withMessage('Debes ingresar un nombre de usuario'),    
    body('contrasenia')
    .notEmpty().withMessage('Debes ingresar una contraseña').bail()
    .isLength({min: 8}).withMessage('Debe contener al menos 8 caracteres')
]