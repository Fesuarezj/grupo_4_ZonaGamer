
const db = require('../../database/models');

const categorysApiControllers = {
    listCategory: async (req, res) => {       
            await db.Categorys.findAll()
            .then(function(categorys) {                                 
                res.status(200).json({
                    description: 'Listado de Categorias',
                    data: categorys,
                    status: 200,
                    url: '/api/categorysApi'
                });
        })
    }
};


module.exports = categorysApiControllers;