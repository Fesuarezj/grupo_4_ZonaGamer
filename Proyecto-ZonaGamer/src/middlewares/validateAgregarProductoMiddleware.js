const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('imagenProducto').custom((value, { req }) =>{
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
    body('name').notEmpty().withMessage('Debes ingresar un nombre al producto'),
    body('description').notEmpty().withMessage('Debes incluir una descripción del producto').bail()
        .isLength({max: 50}).withMessage('Máximo 100 caracteres'),
    body('category').notEmpty().withMessage('Debes selecionar una categoria'),
    body('price').notEmpty().withMessage('Debes ingresar un precio').bail()
        .isLength({max: 7}).withMessage('Máximo 7 caracteres'),
    body('discount').notEmpty().withMessage('Debes ingresar un descuento').bail()
        .isLength({max: 2}).withMessage('Máximo 2 caracteres'),
    body('warranty').notEmpty().withMessage('Debes ingresar una garantía').bail()
        .isLength({max: 2}).withMessage('Máximo 2 caracteres'),
    body('date').notEmpty().withMessage('Debes ingresar la fecha de registro'),
    body('status').notEmpty().withMessage('Debes ingresar un estado')
]