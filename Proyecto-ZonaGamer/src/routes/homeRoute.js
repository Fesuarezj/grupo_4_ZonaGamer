const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// se crean las rutas /home, /registro, etc
router.get('/', homeController.home);

module.exports = router; 