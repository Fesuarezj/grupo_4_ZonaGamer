const fs = require('fs');
const path = require('path');

const db = require('../database/models');

const mainControllers = {
    home: (req, res) => {
        // const productsFilePath = path.join(__dirname, '../data/productsData.json');
		// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // const allProducts = products.filter(product => product.status == true);        

        db.Products.findAll()
            .then(function(products) {                                 
                res.render('home', {products: products.filter(product => product.estado_ID_estado == 1)});
        })


        // res.render('home', {productos : allProducts});
    }
};


module.exports = mainControllers;