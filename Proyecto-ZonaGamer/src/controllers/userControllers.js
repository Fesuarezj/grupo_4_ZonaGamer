const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const path = require('path');

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
        console.log(req.session)
        return res.render('../views/users/login.ejs');
    },    
    procesoLogin: (req, res) => {   
        
        // const resultValdiation = validationResult(req);
        
        // if(resultValdiation.errors.length > 0) {
        //     return res.render('../views/users/login.ejs', { 
        //         errors: resultValdiation.mapped(),
        //         oldData: req.body
        //     });    
        // }          
        
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