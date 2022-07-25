const express = require('express');
const router = express.Router();

const categorysApiControllers = require('../../controllers/api/categorysApiControllers');

/*** LISTADO DE CATEGORIAS ***/
router.get('/', categorysApiControllers.listCategory);

module.exports = router;

