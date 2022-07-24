const fs = require('fs');
const path = require('path');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const db = require('../database/models');

const mainControllers = {
    home: async (_req, res) => {  
            await fetch('http://localhost:3040/api')
            .then(response => response.json())
                .then(products => {                   
                return res.render('home', {products: products.data});
            })         
    }
};


module.exports = mainControllers;