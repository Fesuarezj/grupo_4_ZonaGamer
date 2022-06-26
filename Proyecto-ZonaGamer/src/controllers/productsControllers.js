const fs = require('fs');
const path = require('path');

const db = require('../database/models');

function buscarIdCategory (categoria){
    let idCategory;

    db.Categorys.findOne({
        where: {
            nameCategory: categoria
        }
    })
    .then(function(category) {   
        
        console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTT", category.ID_category)
        idCategory = category.ID_category;
        console.log("ÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑ", idCategory)
                
        return   category.ID_category;        
    });
    // console.log('KKKKKKKKKKKKKKKKKKK', idCategory)

    return idCategory;
}

function categoryList(categoria){
    let idCategoria = 0;    
    switch(categoria){        
        case "Audio":
            idCategoria = 1;
            break;
        case "Coolers":
            idCategoria = 2;
            break;
        case "Discos Rigidos":
            idCategoria = 3;
            break;
        case "Gabinetes":
            idCategoria = 4;
            break;
        case "Memorias":
            idCategoria = 5;
            break;
        case "Monitores":
            idCategoria = 6;
            break;
        case "Motherboards":
            idCategoria = 7;
            break;
        case "Perifericos":
            idCategoria = 8;
            break;
        case "Placas de Video":
            idCategoria = 9;
            break;
        case "Procesadores":
            idCategoria = 10;
            break;
        case "SSD":
            idCategoria = 11;
            break;
        case "Teclados":
            idCategoria = 12;
            break;
        default:
            break;    }
    
    return idCategoria;
};

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
    },
/*** BUSCAR PRODUCTO GET ***/    
    buscarProducto: (req, res) => {
        res.render('../views/products/buscarProducto.ejs')
    },
/*** ENCONTRAR PRODUCTO POST ***/
    encontrarProducto: function (req, res)  {         
        db.Products.findByPk(req.body.ID_products)
            .then(function (products){ 
                const precioFinal = products.price - (products.price * (products.discount / 100));

                return res.render('../views/products/detalleProducto.ejs', {products: products, precio_final: precioFinal });                                    
            }) 
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
/*** EDITAR PRODUCTO GET ***/
    editarProducto: (req, res) => { 
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", req.params.ID_products);         
        db.Products.findByPk(req.params.ID_products)
            .then(function (products){                                                                     
                return res.render('../views/products/editarProducto.ejs', {products: products});                                   
            })    
    },   
/*** ACTUALIZAR PRODUCTO POST ***/ 
    actualizar: (req, res) => {	
        // console.log('$$$$$$$$$$$$$$$$$$$$$', req.params.ID_products)
        // console.log(req.body.name)
        // console.log(req.body.description)
        // console.log(req.file.filename)
        // console.log(Number(req.body.warranty))
        // console.log(Number(req.body.price))
        // console.log(Number(req.body.discount))
        // console.log(req.body.date)
        // console.log((req.body.status == "true")? 1 : 2)
        // console.log("*****", req.body.category)
        // console.log(categoryList(req.body.category));
        // let id = buscarIdCategory(req.body.category); 

        // console.log(id)
        

        db.Products.update({
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,            
            warranty: Number(req.body.warranty),
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            date: req.body.date,
            estado_ID_estado: (req.body.status == "true")? 1 : 2, //(req.body.status)  
            category_ID_category: categoryList(req.body.category) 
            // category_ID_category: id
        }, {
            where: {
                ID_products: req.params.ID_products
            }
        })
        return res.redirect('/products/editar/' + req.params.ID_products);		
	},
/*** ELIMINAR PRODUCTO ***/     	
	delete : (req, res) => {        
        db.Products.destroy({
            where: {
                ID_products: req.params.ID_products
            }
        })
        res.redirect('/');		
	}
};

module.exports = productsControllers;