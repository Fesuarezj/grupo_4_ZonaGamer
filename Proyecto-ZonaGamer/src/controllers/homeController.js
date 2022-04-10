
// 1. Definimos el controlador
const controlador = {
    home: (req, res) => {//enviar la vista home.ejs - Renderizar en el Navegador
        res.render('home', { title: 'Express-Controller -home.ejs-*' });
    }
}

module.exports = controlador;