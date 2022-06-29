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
    body('userName').notEmpty().withMessage('Debes ingresar un nombre de usuario'),    
    body('contrasenia')
    .notEmpty().withMessage('Debes ingresar una contraseña').bail()
    .isLength({min: 8}).withMessage('Debe contener al menos 8 caracteres')
]