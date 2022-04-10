var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

<<<<<<< HEAD
=======
// router.get('/home', function(req, res, next) {
//   res.render('home', { title: 'Express' });
// });

>>>>>>> 7b94b368c88108a868b54656cca092465f8d8936
module.exports = router;
