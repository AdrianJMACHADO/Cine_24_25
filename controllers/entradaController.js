const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger.js");
const initModels = require("../models/init-models.js").initModels;
const sequelize = require("../config/sequelize.js");

const models = initModels(sequelize);
const Entrada = models.entradas;

class EntradaController {
  async createEntrada(req, res) {
    const entrada = req.body;
    try {
      const nuevaEntrada = await Entrada.create(entrada);
      res.status(201).json(Respuesta.exito(nuevaEntrada, "Entrada registrada"));
    } catch (err) {
      logMensaje("Error:", err.name || "Nombre no definido");
      res
        .status(500)
        .json(Respuesta.error(null, `Error al registrar entrada: ${entrada}`));
    }
  }

  async getAllEntradas(req, res) {
    try {
      const data = await Entrada.findAll();
      res.json(Respuesta.exito(data, "Lista de entradas recuperada"));
    } catch (err) {
      res
        .status(500)
        .json(Respuesta.error(null, `Error al obtener entradas: ${req.originalUrl}`));
    }
  }
  async getEntradaById(req, res) {
    const { identrada } = req.params;
    try {
      const entrada = await Entrada.findByPk(identrada);
      if (!entrada) {
        res.status(404).json(Respuesta.error(null, `Entrada no encontrada: ${identrada}`));
      } else {
        res.json(Respuesta.exito(entrada, "Entrada encontrada"));
      }
    } catch (err) {
      res.status(500).json(Respuesta.error(null, `Error al obtener entrada: ${identrada}`));
    }
  }

  async updateEntrada(req, res) {
    const { identrada } = req.params;
    const datosActualizados = req.body;
    try {
      const entrada = await Entrada.findByPk(identrada);
      if (!entrada) {
        res.status(404).json(Respuesta.error(null, `Entrada no encontrada: ${identrada}`));
      } else {
        await entrada.update(datosActualizados);
        res.json(Respuesta.exito(entrada, "Entrada actualizada"));
      }
    } catch (err) {
      res.status(500).json(Respuesta.error(null, `Error al actualizar entrada: ${identrada}`));
    }
  }

  async deleteEntrada(req, res) {
    const { identrada } = req.params;
    try {
      const entrada = await Entrada.findByPk(identrada);
      if (!entrada) {
        res.status(404).json(Respuesta.error(null, `Entrada no encontrada: ${identrada}`));
      } else {
        await entrada.destroy();
        res.json(Respuesta.exito(null, "Entrada eliminada"));
      }
    } catch (err) {
      res.status(500).json(Respuesta.error(null, `Error al eliminar entrada: ${identrada}`));
    }
  }
}

module.exports = new EntradaController();
