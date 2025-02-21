// entradaRoutes.js
const express = require('express');
const router = express.Router();
const entradaController = require('../controllers/entradaController');

router.get('/', entradaController.getAllEntradas);
router.post('/', entradaController.createEntrada);
router.get('/:identrada', entradaController.getEntradaById);
router.put('/:identrada', entradaController.updateEntrada);
router.delete('/:identrada', entradaController.deleteEntrada);

module.exports = router;
