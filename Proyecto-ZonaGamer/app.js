const express = require('express');
const path = require("path");
const app = express()
const port = 3040

////////////////////////////////////////////////////////////////////////////
//  Se declara la ruta de los recursos estaticos del proyecto: /public  ///
//////////////////////////////////////////////////////////////////////////
const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

/////////////////////////////////////////////////////////////
//  Se inicia el servidor express en el puerto definido  ////
/////////////////////////////////////////////////////////////
app.listen(port, ()=> {
    console.log(`Servidor Express ejecutando Proyecto -ZonaGamer- en el puerto : ${port}`);
});

///////////////////////////////////////////////////////////////////
////  Bloque donde se definen las Rutas del proyecto ZonaGamer  ///
///////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});
app.get('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/registro.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});