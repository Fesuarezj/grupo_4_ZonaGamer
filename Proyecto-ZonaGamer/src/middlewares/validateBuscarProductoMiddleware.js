
const { body } = require('express-validator');

module.exports = [   
    body('ID_products').notEmpty().withMessage('Debes ingresar un ID de producto'),        
]