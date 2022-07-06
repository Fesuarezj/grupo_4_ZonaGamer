const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

const db = require('../database/models');

const userControllers = {

    registro: (req, res) => {
        return res.render('../views/users/registro.ejs');
    },

    procesoRegistro: async (req, res) => {      
        const resultValdiation = validationResult(req);
        
        if(resultValdiation.errors.length > 0) {
            return res.render('../views/users/registro.ejs', { 
                errors: resultValdiation.mapped(),
                oldData: req.body
            });           
        } else {
            const correoExiste = await db.Users.findOne({ where: {correoElectronico: req.body.correoElectronico}});
            if (correoExiste) {
                return res.render('../views/users/registro.ejs', { 
                    errors: {
                        correoElectronico: {
                            msg: 'Este correo ya está registrado'
                        }
                    },
                    oldData: req.body,                    
                });
            } else {
                const userNameExiste = await db.Users.findOne({ where: {userName: req.body.userName}});
                if (userNameExiste) {
                    return res.render('../views/users/registro.ejs', { 
                        errors: {
                            userName: {
                                msg: 'Este nombre de usuario ya está registrado'
                            }
                        },
                        oldData: req.body,                    
                    });
                } else {
                    db.Users.create({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        correoElectronico: req.body.correoElectronico,
                        userName: req.body.userName,                        
                        contrasenia: bcryptjs.hashSync(req.body.contrasenia, 10),
                        imagenPerfil: req.file.filename,
                        rol_ID_rol: 2, //todo usuario registrado y/o creado tendra el rol de cliente
                        estado_ID_estado: 1 //todo usuario registrado y/o creado tendra el estado activo
                    });
                    return res.render('../views/users/login.ejs')                    
                }  
            }
        }            
    },

    login: (req, res) => { 
        return res.render('../views/users/login.ejs');
    },

    procesoLogin: async (req, res) => {           
        const resultValdiation = validationResult(req);             

        if(resultValdiation.errors.length > 0) {
            return res.render('../views/users/login.ejs', { 
                errors: resultValdiation.mapped(),
                oldData: req.body
            });    
        } else {        
            const usuarioOk = await db.Users.findOne({ where: {userName: req.body.userName}});

            if (usuarioOk) {                
                if (usuarioOk.contrasenia == req.body.contrasenia) {                               
                    delete usuarioOk.contrasenia;
                    req.session.usuarioLogeado = usuarioOk;                
                    return res.redirect('/users/perfil');    
                } else {                    
                    return res.render('../views/users/login.ejs', { 
                        errors: {
                            contrasenia: {
                                msg: 'Contraseña Incorrecta'
                            }
                        },
                        oldData: req.body,                    
                    });                    
                }                
            } else {                
                return res.render('../views/users/login.ejs', { 
                    errors: {
                        userName: {
                            msg: 'Usuario Inexistente'
                        }
                    },
                    oldData: req.body,                    
                });
            }           
        }               
    },

    perfil: (req, res) => {
        const rolId = ['administrador', 'cliente', 'invitado'];         
        return res.render('../views/users/perfil.ejs', {users: req.session.usuarioLogeado, rolId: rolId});     
    }, 

    editar: (req, res) => {    
        console.log('Estamos enm editar perfil', req.session.usuarioLogeado)
        
        return res.render('../views/users/editar.ejs',  {users: req.session.usuarioLogeado});
        
    },

    logout: (req, res) => {
        req.session.destroy();               
        return res.redirect('/')
    }, 

    contacto: (req, res) => {
        return res.render('../views/users/contacto.ejs');
    }
};


module.exports = userControllers;