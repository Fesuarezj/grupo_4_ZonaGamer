const fs = require('fs');
const path = require('path');

const db = require('../../database/models');

const mainApiControllers = {
    home: async (_req, res) => {       
            await db.Products.findAll()
            .then(function(products) {                                 
                res.status(200).json({
                    description: 'Listado de Productos Activos del Sistema',
                    total: products.filter(product => product.estado_ID_estado == 1).length,
                    data: products.filter(product => product.estado_ID_estado == 1),
                    status: 200,
                    url: '/api/homeApi'
                });
        })
    }
};


module.exports = mainApiControllers;