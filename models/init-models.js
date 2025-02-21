var DataTypes = require("sequelize").DataTypes;
var _clientes = require("./clientes");
var _entradas = require("./entradas");

function initModels(sequelize) {
  var clientes = _clientes(sequelize, DataTypes);
  var entradas = _entradas(sequelize, DataTypes);

  entradas.belongsTo(clientes, { as: "idcliente_cliente", foreignKey: "idcliente"});
  clientes.hasMany(entradas, { as: "entradas", foreignKey: "idcliente"});

  return {
    clientes,
    entradas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
