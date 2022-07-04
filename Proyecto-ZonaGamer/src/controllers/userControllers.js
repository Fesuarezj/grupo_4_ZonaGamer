const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

const db = require('../database/models');

const userControllers = {
    registro: (req, res) => {
        return res.render('../views/users/registro.ejs');
    },
    procesoRegistro: (req, res) => {      
        const resultValdiation = validationResult(req);
        
        if(resultValdiation.errors.length > 0) {
            return res.render('../views/users/registro.ejs', { 
                errors: resultValdiation.mapped(),
                oldData: req.body
            });
            
        


        } else {
            // const project = db.Users.findOne({ where: { userName: req.body.userName } });
            // // console.log('***********gfgfgddgfdgdfgdf***********fdgfdgfdgfdgdf*', project)
            
            // if (project === null) {
            //     console.log('*****Not found!*******');
            // } else {
            //     console.log('*******usuario encontrado********', project);                
            // }
            // db.Users.findOne({
            //     where: {
            //         userName: req.body.userName,                  
            //     }
            // })
            // .then(function(users) {
            //     console.log('ALERTA USER NAME REPERIDO')
            //     return res.render('../views/users/registro.ejs', { 
            //         errors: {
            //             userName: {
            //                 msg: 'Este nombre de usuario ya esta registrado'
            //             }
            //         },
            //         oldData: req.body,                    
            //     });                                            
            // });

            db.Users.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    correoElectronico: req.body.correoElectronico,
                    userName: req.body.userName,
                    // contrasenia: req.body.contrasenia,
                    contrasenia: bcryptjs.hashSync(req.body.contrasenia, 10),
                    imagenPerfil: req.file.filename,
                    rol_ID_rol: 2, //todo usuario registrado y/o creado tendra el rol de cliente
                    estado_ID_estado: 1 //todo usuario registrado y/o creado tendra el estado activo
                });
                return res.render('../views/users/login.ejs')
        }            
    },
    login: (req, res) => { 
        return res.render('../views/users/login.ejs');
    },       
    procesoLogin: (req, res) => {           
        const resultValdiation = validationResult(req);
        
        console.log('0holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', req.body.userName)
        console.log('0holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', req.body.contrasenia)

        if(resultValdiation.errors.length > 0) {
            return res.render('../views/users/login.ejs', { 
                errors: resultValdiation.mapped(),
                oldData: req.body
            });    
        } else{         
        console.log('1holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', req.body.userName)
        console.log('1holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', req.body.contrasenia)
        
            db.Users.findOne({
                where: {
                    userName: req.body.userName,
                    contrasenia: req.body.contrasenia                    
                }
            })
            .then(function(users) {
                const rolId = ['administrador', 'cliente', 'invitado']                   
                return res.render('../views/users/perfil.ejs', {users: users, rolId: rolId});                             
            });
        }  
        console.log('2holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', req.body.userName)
        console.log('2holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', req.body.contrasenia)         
    },
    perfil: (req, res) => {    
        return res.render('../views/users/perfil.ejs');
    },   
    editar: (req, res) => {    
        return res.render('../views/users/editar.ejs');
    },   
    contacto: (req, res) => {
        return res.render('../views/users/contacto.ejs');
    }
};


module.exports = userControllers;