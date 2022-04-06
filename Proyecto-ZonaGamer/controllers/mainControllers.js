// const mainControllers = {
//     index: function(req, res){
//         res.render('index', {menu: menu});
//     }    
// }

const mainControllers = {
    index: (req, res) => {
        res.render('home')
    }
};

module.exports = mainControllers;