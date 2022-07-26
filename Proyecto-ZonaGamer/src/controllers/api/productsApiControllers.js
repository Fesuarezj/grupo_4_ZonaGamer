
const { response } = require('express');
const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');

const db = require('../../database/models');

const productsApiControllers = {
/*** LISTADO PRODUCTOS ***/    
    index: async (_req, res) => {        
        await db.Products.findAll()  
        .then(function(products) {              
            return res.status(200).json({
                description: 'Lista de Productos del Sistema',
                total: products.length,
                data: products,
                status: 200,
                url: '/api/productsApi'
            });            
        })               
    },
/*** DETALLE PRODUCTO ***/
    producto: async (req, res) => {                        
        await db.Products.findByPk(req.params.ID_products)
            .then(function (products) {                            
                return res.status(200).json({
                    description: 'Detalle del Producto',                     
                    data: products,
                    precio_final: products.price - (products.price * (products.discount / 100)),                    
                    status: 200,
                    url: '/api/productsApi/detalle/:ID_products'
                });                             
            })              
    },
/*** VISTA AGREGAR PRODUCTO ***/
    agregarProducto: (_req, res) => {       
        res.render('../views/products/agregarProducto');        
    },
/*** PROCESO AGREGAR PRODUCTO ***/
    store: async (req, res) => {          
            await db.Products.create(req.body)
                .then(function (products) {
                    return res.status(200).json({
                        data: products,
                        status: 200,
                        url: '/api/productsApi/agregar',
                        created: 'ok'
                    })
                })            
    },
    /*** LISTADO DE CATEGORIAS ***/    
    listCategory: async (req, res) => { 
        await db.Categorys.findAll()
            .then(function (categorys) {                            
                return res.status(200).json({
                    description: 'Listado de Categorias',                    
                    data: categorys,                                    
                    status: 200,
                    url: '/api/productsApi/categorias'
                });                             
            })            
    },
    /*** ULTIMO PRODUCTO ***/    
    lastProduct: async (req, res) => { 
        await db.Products.findOne({order: [['ID_products', 'desc']] })           
            .then(function (products) {                  
                return res.status(200).json({
                    description: 'Ultimo Producto',                    
                    data: products,                                    
                    status: 200,
                    url: '/api/productsApi/ultimoProducto'
                });                             
            })            
    }
};

module.exports = productsApiControllers;