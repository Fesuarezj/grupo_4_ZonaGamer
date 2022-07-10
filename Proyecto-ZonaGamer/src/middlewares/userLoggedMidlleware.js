const db = require('../database/models');

async function userLoggedMidlleware(req, res, next) {
    const usuarioEnCookie = req.cookies.userName;   
    
    res.locals.estaLogeado = false;    

    if (usuarioEnCookie) {
        const usuarioDeLaCookie = await db.Users.findOne({ where: { userName: usuarioEnCookie } });
        req.session.usuarioLogeado = usuarioDeLaCookie;                
    } 

    if (req.session.usuarioLogeado) {
        res.locals.estaLogeado = true;
        res.locals.usuarioLogeado = req.session.usuarioLogeado;
    }
    
    next();
}

module.exports =  userLoggedMidlleware;