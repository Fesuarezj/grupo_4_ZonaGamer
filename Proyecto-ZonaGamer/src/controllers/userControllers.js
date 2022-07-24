const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const db = require('../database/models');

const userControllers = {
    /*** LISTADO PRODUCTOS ***/    
    listado: async (req, res) => {            
        await fetch('http://localhost:3040/api/usersApi')
            .then(response => response.json())
            .then(users => {        
                return res.render('../views/users/listadoUsuario', {users: users.data});
            })                    
    },
    /*** VISTA REGISTRO USUARIO ***/ 
    registro: (req, res) => {        
        return res.render('../views/users/registro');
    },
    /*** PROCESO REGISTRO USUARIO ***/ 
    procesoRegistro: async (req, res) => {      
        const resultValdiation = validationResult(req);
        
        if(resultValdiation.errors.length > 0) {
            return res.render('../views/users/registro', { 
                errors: resultValdiation.mapped(),
                oldData: req.body
            });           
        } else {
            const correoExiste = await db.Users.findOne({ where: {correoElectronico: req.body.correoElectronico}});
            if (correoExiste) {
                return res.render('../views/users/registro', { 
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
                    return res.render('../views/users/registro', { 
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
                        rol_ID_rol: 2, //todo usuario registrado y/o creado tendra el rol de cliente (rol_ID_rol 2)
                        estado_ID_estado: 1 //todo usuario registrado y/o creado tendra el estado activo (estado_ID_estado 1)
                    });                   
                    
                    return res.render('../views/users/login')                    
                }  
            }
        }            
    },
    /*** VISTA LOGIN USUARIO ***/ 
    login: (req, res) => {               
        return res.render('../views/users/login');
    },
    /*** PROCESO LOGIN USUARIO ***/  
    procesoLogin: async (req, res) => {           
        const resultValdiation = validationResult(req);             

        if(resultValdiation.errors.length > 0) {
            return res.render('../views/users/login', { 
                errors: resultValdiation.mapped(),
                oldData: req.body
            });    
        } else {        
            const usuarioOk = await db.Users.findOne({ where: {userName: req.body.userName}});

            if (usuarioOk) {               
                if (bcryptjs.compareSync(req.body.contrasenia, usuarioOk.contrasenia)) {                                                            
                    delete usuarioOk.contrasenia;
                    req.session.usuarioLogeado = usuarioOk;    
                    
                    if (req.body.recordarUsuario) {
                        res.cookie('userName', req.body.userName, { maxAge: (1000 * 60) * 10 });
                    }
                    return res.redirect('/users/perfil/' + req.session.usuarioLogeado.ID_usuario);    
                } else {                    
                    return res.render('../views/users/login', { 
                        errors: {
                            contrasenia: {
                                msg: 'Contraseña Incorrecta'
                            }
                        },
                        oldData: req.body,                    
                    });                    
                }                
            } else {                
                return res.render('../views/users/login', { 
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
    /*** VISTA PERFIL USUARIO ***/ 
    perfil: (req, res) => {        
        const rolId = ['administrador', 'cliente', 'invitado'];         
        return res.render('../views/users/perfil', {users: req.session.usuarioLogeado, rolId: rolId});     
    }, 
    /*** VISTA EDITAR USUARIO ***/ 
    editar: (req, res) => { 
        db.Users.findByPk(req.params.ID_usuario)
            .then(function (users){                                                                     
                return res.render('../views/users/editar', {users: users});                                   
            })                    
        // return res.render('../views/users/editar',  {users: req.session.usuarioLogeado});
        
    },
    /*** PROCESO ACTUALIZAR USUARIO ***/ 
    actualizar: (req, res) => {	       
        db.Users.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            userName: req.body.userName,
            contrasenia: req.body.contrasenia,            
            imagenPerfil: req.file.filename,                    
        }, {
            where: {
                ID_usuario: req.params.ID_usuario
            }
        })
        return res.redirect('/users/editar/' + req.params.ID_usuario);		
    },
    /*** ELIMINAR USUARIO ***/ 
    logout: (req, res) => {
        res.clearCookie('userName');
        req.session.destroy();               
        return res.redirect('/')
    }, 

    contacto: (req, res) => {
        return res.render('../views/users/contacto');
    }
};


module.exports = userControllers;