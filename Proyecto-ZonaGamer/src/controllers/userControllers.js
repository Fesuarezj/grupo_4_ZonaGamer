const path = require('path');



const userControllers = {
    registro: (req, res) => {
        res.render('../views/users/registro.ejs')
    },
    login: (req, res) => {
        res.render('../views/users/login.ejs')
    },
};


module.exports = userControllers;