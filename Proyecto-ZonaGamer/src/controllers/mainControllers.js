// const mainControllers = {
//     index: function(req, res){
//         res.render('index', {menu: menu});
//     }    
// }

const mainControllers = {
    home: (req, res) => {
        res.render('home.ejs')
    }
};


module.exports = mainControllers;