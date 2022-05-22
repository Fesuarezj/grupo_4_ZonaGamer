const fs = require('fs');
const path = require('path');


const userFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { validationResult } = require('express-validator');

const User = require('../models/User');
const bcryptjs = require('bcryptjs');

const userControllers = {   
    registro: (req, res) => {        
        res.render('../views/users/registro.ejs')
    },
    procesoRegistro: (req, res) => {
        const resultValidation = validationResult(req);               
                
        if (resultValidation.errors.length > 0) {
            return res.render('../views/users/registro', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } 

        const usuarioEnDB = User.findByField('correoElectronico', req.body.correoElectronico);

        if (usuarioEnDB) {
            return res.render('../views/users/registro', {
                errors: {
                    correoElectronico: {
                        msg: 'Este correo ya esta registrado'
                    }
                },
                oldData: req.body
            });
        }

        const usuarioACrear = {
            ...req.body,
            contrasenia: bcryptjs.hashSync(req.body.contrasenia, 10),
            imagenPerfil: req.file.filename
        } 
        
        const usuarioCreado = User.create(usuarioACrear);

        return res.redirect('../users/login');     
    },

    login: (req, res) => {                             
        res.render('../views/users/login.ejs');
    },

    procesoLogin: (req, res) => {        
        const usuarioALogear = User.findByField('userName', req.body.userName);       
        
        if (usuarioALogear) {
            const contraseniaOk = bcryptjs.compareSync(req.body.contrasenia, usuarioALogear.contrasenia); 
            if (contraseniaOk) {
                delete usuarioALogear.contrasenia;
                req.session.usuarioLogeado = usuarioALogear;

                if (req.body.recordarUsuario) {
                    res.cookie('userName', req.body.userName, {maxAge: 1000 * 30});
                }

                return res.redirect('../users/perfil');    
            }   
            
                return res.render('../views/users/login.ejs', {
                errors: {
                    contrasenia: {
                        msg: 'Contraseña Incorrecta'
                    }
                }   
            });
        }

        return res.render('../views/users/login.ejs', {
            errors: {
                userName: {
                    msg: 'Usuario no registrado'
                }
            }   
        });
    },
    
    perfil: (req, res) => {      
        
        console.log(req.cookies.userName);      
        
        res.render('../views/users/perfil.ejs', {
            usuario : req.session.usuarioLogeado
        });
    },

    logout: (req, res) => {
        res.clearCookie('userName');
        req.session.destroy();               
        return res.redirect('/');
    },
    
    contacto: (req, res) => {
        res.render('../views/users/contacto.ejs')
    }
}

module.exports = userControllers;