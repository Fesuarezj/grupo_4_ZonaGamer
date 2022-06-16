const User = require('../models/User.js');

function userLoggedMiddleware(req, res, next) {
    console.log('Dentro de userLoggedMiddleware');
    res.locals.estaLogeado = false;

    const usuarioEnCookie = req.cookies.userName;
    const usuarioDesdeCookie = User.findByField('userName', usuarioEnCookie);         

    if (usuarioDesdeCookie) {
        console.log('entra en usuarioDesdeCookie');
        req.session.usuarioLogeado = usuarioDesdeCookie;
    }

    if (req.session.usuarioLogeado) {
        console.log('entra en req.session.usuarioLogeado')
        res.locals.estaLogeado = true;
        res.locals.usuarioLogeado = req.session.usuarioLogeado;
    }    

    next();
}       

module.exports = userLoggedMiddleware;