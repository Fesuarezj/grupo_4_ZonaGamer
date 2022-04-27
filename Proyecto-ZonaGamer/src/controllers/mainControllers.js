const fs = require('fs');
const path = require('path');

const mainControllers = {
    home: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/productsData.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const allProducts = products.filter(product => product.status == true);

        res.render('home', {productos : allProducts});
    }
};


module.exports = mainControllers;