const db = require('../../database/models');

const userApiControllers = {
    /*** LISTADO DE USUARIOS ***/    
    listado: async (req, res) => { 
        // return res.json('Hola');
        await db.Users.findAll()  
        .then(function(users) {              
            return res.status(200).json({
                description: 'Lista de Usuarios del Sistema',
                total: users.length,
                data: users,
                status: 200,
                url: '/api/usersApi'
            });            
        })               
    },
    /*** LISTADO DE USUARIOS ***/    
    perfil: async (req, res) => { 
        await db.Users.findByPk(req.params.ID_products)
            .then(function (users) {                            
                return res.status(200).json({
                    description: 'Perfil Usuario',                    
                    data: users,                                    
                    status: 200,
                    url: '/api/usersApi/perfil/:ID_usuario'
                });                             
            })            
    }    
};

module.exports = userApiControllers;