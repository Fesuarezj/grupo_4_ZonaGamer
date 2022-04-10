var express = require('express');
var router = express.Router();

<<<<<<< HEAD
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
=======
const userControllers = require('../controllers/userControllers');

router.get('/registro', userControllers.registro);
router.get('/login', userControllers.login);

>>>>>>> 7b94b368c88108a868b54656cca092465f8d8936

module.exports = router;
