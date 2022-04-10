const productsControllers = {
    producto: (req, res) => {
        res.render('../views/products/producto.ejs')
    },
    carrito: (req, res) => {
        res.render('../views/products/carrito.ejs')
    },
    agregarProducto: (req, res) => {
        res.render('../views/products/agregarProducto.ejs', { title: 'Agregar Producto' });
    }
};


module.exports = productsControllers;