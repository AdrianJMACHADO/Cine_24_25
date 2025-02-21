const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger.js");
const initModels = require("../models/init-models.js").initModels;
const sequelize = require("../config/sequelize.js");

const models = initModels(sequelize);
const Cliente = models.clientes;

class ClienteController {
  async createCliente(req, res) {
    const cliente = req.body;
    try {
      const nuevoCliente = await Cliente.create(cliente);
      res.status(201).json(Respuesta.exito(nuevoCliente, "Cliente registrado"));
    } catch (err) {
      logMensaje("Error:", err.name || "Nombre no definido");
      res
        .status(500)
        .json(Respuesta.error(null, `Error al registrar cliente: ${cliente}`));
    }
  }

  async getAllClientes(req, res) {
    try {
      const data = await Cliente.findAll();
      res.json(Respuesta.exito(data, "Lista de clientes recuperada"));
    } catch (err) {
      res
        .status(500)
        .json(Respuesta.error(null, `Error al obtener clientes: ${req.originalUrl}`));
    }
  }
  async getTipoById(req, res) {
    const { idcliente } = req.params;
    try {
      const cliente = await Cliente.findByPk(idcliente);
      if (!cliente) {
        res.status(404).json(Respuesta.error(null, `Cliente no encontrado: ${idcliente}`));
      } else {
        res.json(Respuesta.exito(cliente, "Cliente encontrado"));
      }
    } catch (err) {
      res.status(500).json(Respuesta.error(null, `Error al obtener cliente: ${idcliente}`));
    }
  }

  async updateCliente(req, res) {
    const { idcliente } = req.params;
    const datosActualizados = req.body;
    try {
      const cliente = await Cliente.findByPk(idcliente);
      if (!cliente) {
        res.status(404).json(Respuesta.error(null, `Cliente no encontrado: ${idcliente}`));
      } else {
        await cliente.update(datosActualizados);
        res.json(Respuesta.exito(cliente, "Cliente actualizado"));
      }
    } catch (err) {
      res.status(500).json(Respuesta.error(null, `Error al actualizar cliente: ${idcliente}`));
    }
  }

  async deleteCliente(req, res) {
    const { idcliente } = req.params;
    try {
      const cliente = await Cliente.findByPk(idcliente);
      if (!cliente) {
        res.status(404).json(Respuesta.error(null, `Cliente no encontrado: ${idcliente}`));
      } else {
        await cliente.destroy();
        res.json(Respuesta.exito(null, "Cliente eliminado"));
      }
    } catch (err) {
      res.status(500).json(Respuesta.error(null, `Error al eliminar cliente: ${idcliente}`));
    }
  }
}

module.exports = new ClienteController();
