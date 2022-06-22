const fs = require('fs');
const path = require('path');

const db = require('../database/models');

// const productsFilePath = path.join(__dirname, '../data/productsData.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsControllers = {
    index: (req, res) => {
        // const productsFilePath = path.join(__dirname, '../data/productsData.json');
		// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // const allProducts = products;
        db.Products.findAll()
        .then(function(products) {              
            res.render('../views/products/listadoProductos.ejs', {products: products});
        })

        
        // res.render('../views/products/listadoProductos.ejs', {productos : allProducts});
    },

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

/*** VISTA AGREGAR PRODUCTO ***/
    agregarProducto: (req, res) => {       
        res.render('../views/products/agregarProducto.ejs');        
    },
/*** AGREGAR PRODUCTO ***/
    store: (req, res) => {
        // const productsFilePath = path.join(__dirname, '../data/productsData.json');
        // const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        db.Products.create({
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,            
            warranty: Number(req.body.warranty),
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            date: req.body.date,
            // date: '2022-12-25 00:00:00',
            estado_ID_estado: (req.body.status == 'true')? 1 : 2,  
            // estado_ID_estado: 1,
            category_ID_category: Number(req.body.category) 
            // category_ID_category: 1
        });
        return res.render('../views/users/perfil.ejs');

    //     const nuevoProducto = {
    //         "id": products[products.length - 1].id + 1,//dentro de prodcuts voy a la última posicón del array y a la propiedad id le sumo 1, para almacenar un nuevo producto
    //         "name": req.body.name,
    //         "description": req.body.description,	
    //         "image": req.files[0].filename,
    //         "category": req.body.category,
    //         "warranty": Number(req.body.warranty),
    //         "price": Number(req.body.price),
    //         "discount": Number(req.body.discount),
    //         "date": req.body.date,
    //         "status": (req.body.status == "true")? true : false 
    //         // "status": new Boolean(req.body.status )

    // }
    //     products.push(nuevoProducto);

	// 	fs.writeFileSync(productsFilePath,JSON.stringify(products, null , ' '));
		
	// 	res.redirect('/');
    },

    /*** EDITAR PRODUCTO ***/
    editarProducto: (req, res) => {
        const productsFilePath = path.join(__dirname, '../data/productsData.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const idProduct = req.params.id;
		const productoBuscado = products.find(producto => producto.id == idProduct);      

        res.render('../views/products/editarProducto.ejs', {producto: productoBuscado});
    },   
    /*** ACTUALIZAR PRODUCTO ***/ 
    actualizar: (req, res) => {	
		const productsFilePath = path.join(__dirname, '../data/productsData.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const indiceProductoBuscado = products.findIndex(producto => producto.id == req.params.id);   
        
        console.log(products[indiceProductoBuscado]);


		if (indiceProductoBuscado != -1) {
			products[indiceProductoBuscado].name = req.body.name;
            products[indiceProductoBuscado].description = req.body.description;
            products[indiceProductoBuscado].image = req.body.image;
            products[indiceProductoBuscado].category = req.body.category;
            products[indiceProductoBuscado].warranty = req.body.warranty;
			products[indiceProductoBuscado].price = Number(req.body.price);
			products[indiceProductoBuscado].discount = Number(req.body.discount);
			products[indiceProductoBuscado].date = req.body.date;
			products[indiceProductoBuscado].status = (req.body.status == "true")? true : false;
		}
		
		fs.writeFileSync(productsFilePath,JSON.stringify(products, null , ' '));

		res.redirect('/');
	},

    	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productsFilePath = path.join(__dirname, '../data/productsData.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let idAEliminar =  req.params.id;
		let productosFiltrados = products.filter(product => product.id != idAEliminar);
		fs.writeFileSync(productsFilePath,JSON.stringify(productosFiltrados, null , ' '));

		res.redirect('/');
	}
};

module.exports = productsControllers;