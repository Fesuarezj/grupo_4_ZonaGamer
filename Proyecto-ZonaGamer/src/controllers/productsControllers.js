const fs = require('fs');
const path = require('path');

const db = require('../database/models');

// const productsFilePath = path.join(__dirname, '../data/productsData.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsControllers = {
/*** LISTADO PRODUCTOS ***/    
    index: (req, res) => {        
        db.Products.findAll()
        .then(function(products) {              
            res.render('../views/products/listadoProductos.ejs', {products: products});
        })               
    },
/*** DETALLE PRODUCTO ***/
    producto: (req, res) => {          
        db.Products.findByPk(req.params.ID_products)
            .then(function (products){
                const precioFinal = products.price - (products.price * (products.discount / 100));
                
                return res.render('../views/products/detalleProducto.ejs', {products: products, precio_final: precioFinal });                              
            })           
        // const productsFilePath = path.join(__dirname, '../data/productsData.json');
		// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // const productoBuscado = products.find(producto => producto.id == req.params.id);
        // const precioFinal = productoBuscado.price - (productoBuscado.price * (productoBuscado.discount / 100));	

        // res.render('../views/products/detalleProducto.ejs', {producto: productoBuscado, precio_final: precioFinal})
    },
/*** BUSCAR PRODUCTO GET ***/    
    buscarProducto: (req, res) => {
        res.render('../views/products/buscarProducto.ejs')
    },
/*** ENCONTRAR PRODUCTO POST ***/
    encontrarProducto: function (req, res)  { 
        console.log('+++++++++++++++++++++', req.body)
        
        db.Products.findByPk(req.body.ID_products)
            .then(function (products){ 
                const precioFinal = products.price - (products.price * (products.discount / 100));
                console.log(products)
                    
                return res.render('../views/products/detalleProducto.ejs', {products: products, precio_final: precioFinal });          
                // return res.render('../views/products/detalleProducto.ejs', {products: products});                              
            }) 
        // res.render('../views/products/buscarProducto.ejs')
        // res.send('producto encontado ' +  req.body.ID_products)
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
        db.Products.create({
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,            
            warranty: Number(req.body.warranty),
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            date: req.body.date,
            estado_ID_estado: (req.body.status == "true")? 1 : 2,  
            category_ID_category: Number(req.body.category) 
        });
            return res.redirect('./');         
    },
/*** EDITAR PRODUCTO ***/
    editarProducto: (req, res) => {
        
        // const productsFilePath = path.join(__dirname, '../data/productsData.json');
		// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // const idProduct = req.params.id;
		// const productoBuscado = products.find(producto => producto.id == idProduct);      

        // res.render('../views/products/editarProducto.ejs', {producto: productoBuscado});
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
/*** ELIMINAR PRODUCTO ***/ 
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