const User = require('../models/User.js');

function userLoggedMiddleware(req, res, next) {
    res.locals.estaLogeado = false;

    const usuarioEnCookie = req.cookies.userName;
    const usuarioDesdeCookie = User.findByField('userName', usuarioEnCookie);         

    if (usuarioDesdeCookie) {
        req.session.usuarioLogeado = usuarioDesdeCookie;
    }

    if (req.session.usuarioLogeado) {
        res.locals.estaLogeado = true;
        res.locals.usuarioLogeado = req.session.usuarioLogeado;
    }    

    next();
}       

module.exports = userLoggedMiddleware;