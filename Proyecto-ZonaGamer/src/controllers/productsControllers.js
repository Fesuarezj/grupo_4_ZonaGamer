const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsControllers = {
    producto: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/productsData.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const productoBuscado = products.find(producto => producto.id == req.params.id);
        const precioFinal = productoBuscado.price - (productoBuscado.price * (productoBuscado.discount / 100));	

        res.render('../views/products/detalleProducto.ejs', {producto: productoBuscado, precio_final: precioFinal})
    },

    
    carrito: (req, res) => {
        res.render('../views/products/carrito.ejs')
    },

/*** AGREGAR PRODUCTO ***/
    agregarProducto: (req, res) => {
        // const productsFilePath = path.join(__dirname, '../data/productsData.json');
        // const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render('../views/products/agregarProducto.ejs');        
    },


    store: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/productsData.json');
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const nuevoProducto = {
        "id": products[products.length - 1].id + 1,//dentro de prodcuts voy a la última posicón del array y a la propiedad id le sumo 1, para almacenar un nuevo producto
        "name": req.body.name,
        "description": req.body.description,	
        "image": req.files[0].filename,
        "category": req.body.category,
        "warranty": Number(req.body.warranty),
        "price": Number(req.body.price),
        "discount": Number(req.body.discount),
        "date": req.body.date,
        "status": req.body.status      
    }

        products.push(nuevoProducto);

		fs.writeFileSync(productsFilePath,JSON.stringify(products, null , ' '));
		
		res.redirect('/');

    }

};


module.exports = productsControllers;