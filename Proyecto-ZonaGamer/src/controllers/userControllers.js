const path = require('path');



const userControllers = {
    registro: (req, res) => {
        res.render('../views/users/registro.ejs')
    },
    login: (req, res) => {    
        res.render('../views/users/login.ejs')
    },
    contacto: (req, res) => {
        res.render('../views/users/contacto.ejs')
    }
};


module.exports = userControllers;