const path = require('path');
const { body } = require('express-validator');

module.exports = [
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