
const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');

const db = require('../database/models');

// function buscarIdCategory (categoria){
//     let idCategory;

//     db.Categorys.findOne({
//         where: {
//             nameCategory: categoria
//         }
//     })
//     .then(function(category) {                 
//         idCategory = category.ID_category;                 
//         return   category.ID_category;        
//     });    
//     return idCategory;
// }

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
            res.render('../views/products/listadoProductos', {products: products});
            // res.json(products);
        })               
    },
/*** DETALLE PRODUCTO ***/
    producto: (req, res) => {          
        db.Products.findByPk(req.params.ID_products)
            .then(function (products){
                const precioFinal = products.price - (products.price * (products.discount / 100));
                const estadoID = ['Disponible', 'No Disponible'];                         
                return res.render('../views/products/detalleProducto', {products: products, precio_final: precioFinal, estadoID: estadoID });                             
            })              
    },
/*** BUSCAR PRODUCTO GET ***/    
    buscarProducto: (req, res) => {
        res.render('../views/products/buscarProducto')
    },
/*** ENCONTRAR PRODUCTO POST ***/
    encontrarProducto: function (req, res)  {         
        db.Products.findByPk(req.body.ID_products)
            .then(function (products){ 
                const precioFinal = products.price - (products.price * (products.discount / 100));
                const estadoID = ['Disponible', 'No Disponible'];
                return res.render('../views/products/detalleProducto', {products: products, precio_final: precioFinal, estadoID: estadoID  });                                    
            }) 
    },
    filtarPorCategoria: async (req, res) => {
        await db.Products.findAll()
            .then(function (products) {                 
                res.render('../views/products/productosFiltrados', {products: products.filter(product => product.category_ID_category == req.params.ID_category)});               
            })
    },    
    carrito: (req, res) => {
        res.render('../views/products/carrito')
    },
/*** VISTA AGREGAR PRODUCTO ***/
    agregarProducto: (req, res) => {       
        res.render('../views/products/agregarProducto');        
    },
/*** AGREGAR PRODUCTO ***/
    store: (req, res) => {
        const resultValdiation = validationResult(req);
        
        if(resultValdiation.errors.length > 0) {
            return res.render('../views/products/agregarProducto', { 
                errors: resultValdiation.mapped(),
                oldData: req.body
            });    
        } else {            
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
        }       
    },
/*** EDITAR PRODUCTO GET ***/
    editarProducto: (req, res) => {             
        db.Products.findByPk(req.params.ID_products)
            .then(function (products){                                                                     
                return res.render('../views/products/editarProducto', {products: products});                                   
            })    
    },   
/*** ACTUALIZAR PRODUCTO POST ***/ 
    actualizar: (req, res) => {	       
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