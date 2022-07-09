function guestMiddlewareLogin (req, res, next) {  
    if (req.session.usuarioLogeado) {        
            return res.redirect('/users/perfil/' + req.session.usuarioLogeado.ID_usuario);  
    }
    next();
}

module.exports = guestMiddlewareLogin;