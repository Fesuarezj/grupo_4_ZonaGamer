const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { validationResult } = require('express-validator');

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
        else {
            const usersFilePath = path.join(__dirname, '../data/usersData.json');
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

            const nuevoUsuario = {
                "id": users[users.length - 1].id + 1,//dentro de users voy a la última posicón del array y a la propiedad id le sumo 1, para almacenar un nuevo producto
                "image": req.file.filename,
                "name": req.body.nombre,
                "lastname": req.body.apellido,                
                "email": req.body.correoElectronico,
                "username": req.body.userName,
                "password": req.body.contrasenia                
            }
            
            users.push(nuevoUsuario);
            
            fs.writeFileSync(usersFilePath,JSON.stringify(users, null , ' '));           
            
            return res.send('Ok, Usuario Registrado Correctamente');
        }        
    },
    login: (req, res) => {    
        res.render('../views/users/login.ejs')
    },
    listaDeUsuarios: (req, res) => {
        res.render('../views/users/usersList.ejs')
    },
    contacto: (req, res) => {
        res.render('../views/users/contacto.ejs')
    }
};


module.exports = userControllers;