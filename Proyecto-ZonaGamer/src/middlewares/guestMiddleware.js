function guestMiddleware (req, res, next) {
    if (req.session.usuarioLogeado) {
        return res.redirect('/users/perfil');
    }

    next();


}

module.exports = guestMiddleware;