const path = require('path');

const { validationResult } = require('express-validator');



const userControllers = {
    registro: (req, res) => {
        res.render('../views/users/registro.ejs')
    },
    procesoRegistro: (req, res) => {
        const resultValidation = validationResult(req);
                
        if (resultValidation.errors.length > 0) {
            return res.render('../views/users/registro', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        return res.send('Ok, las validaciones fueron correctas');
    },
    login: (req, res) => {    
        res.render('../views/users/login.ejs')
    },
    listaDeUsuarios: (req, res) => {
        res.render('../views/users/usersList.ejs')
    },
    contacto: (req, res) => {
        res.render('../views/users/contacto.ejs')
    }
};


module.exports = userControllers;