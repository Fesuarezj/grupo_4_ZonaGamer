const db = require('../database/models');

async function userLoggedMidlleware(req, res, next) {
    const usuarioEnCookie = req.cookies.userName;   
    
    res.locals.estaLogeado = false;    

    if (usuarioEnCookie) {
        const usuarioDeLaCookie = await db.Users.findOne({ where: { userName: usuarioEnCookie } });
        req.session.usuarioLogeado = usuarioDeLaCookie;
        console.log('ggggggggggggggggggggggggg', usuarioDeLaCookie);
        console.log('kjdhaskddhlkhdjkashdkljdhasadd', req.session.usuarioLogeado);
        
    } else { 
        console.log('la cookie ha expirado')        
    }
    // if (usuarioDeLaCookie) {
        
    // }

    if (req.session.usuarioLogeado) {
        res.locals.estaLogeado = true;
        res.locals.usuarioLogeado = req.session.usuarioLogeado;
    }
    
    next();
}

module.exports =  userLoggedMidlleware;