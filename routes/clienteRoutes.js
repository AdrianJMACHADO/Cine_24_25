// clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getAllClientes);
router.post('/', clienteController.createCliente);
router.get('/:idcliente', clienteController.getTipoById);
router.put('/:idcliente', clienteController.updateCliente);
router.delete('/:idcliente', clienteController.deleteCliente);

module.exports = router;
