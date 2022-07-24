const db = require('../../database/models');

const userApiControllers = {
    /*** LISTADO DE USUARIOS ***/    
    listado: (req, res) => { 
        return res.json('Hola');
        // await db.Users.findAll()  
        // .then(function(users) {              
        //     return res.status(200).json({
        //         description: 'Lista de Usuarios del Sistema',
        //         total: users.length,
        //         data: users,
        //         status: 200,
        //         url: '/api/usersApi'
        //     });            
        // })               
    },
};

module.exports = userApiControllers;