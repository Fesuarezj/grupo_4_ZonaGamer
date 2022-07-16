const fs = require('fs');
const path = require('path');

const db = require('../database/models');

const mainControllers = {
    home: (req, res) => {       
        db.Products.findAll()
            .then(function(products) {                                 
                res.render('home', {products: products.filter(product => product.estado_ID_estado == 1)});
        })


        // res.render('home', {productos : allProducts});
    }
};


module.exports = mainControllers;