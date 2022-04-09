const productsControllers = {
    producto: (req, res) => {
        res.render('../views/products/producto.ejs')
    },
    carrito: (req, res) => {
        res.render('../views/products/carrito.ejs')
    }
};


module.exports = productsControllers;