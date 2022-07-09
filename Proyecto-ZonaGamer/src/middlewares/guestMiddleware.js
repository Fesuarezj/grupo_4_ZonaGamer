function guestMiddleware (req, res, next) {  
    if (req.session.usuarioLogeado && req.session.usuarioLogeado.rol_ID_rol != 1) {        
            return res.redirect('/users/perfil/' + req.session.usuarioLogeado.ID_usuario);  
    }
    next();
}

module.exports = guestMiddleware;