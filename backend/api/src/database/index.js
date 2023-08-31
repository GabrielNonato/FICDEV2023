const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { UsuarioModel } = require('../models/usuario-model');
const { SalaModel } = require('../models/sala-model')
const { ReservaModel } = require('../models/reserva-model')

const database = new Sequelize(configDatabase);

// init models
UsuarioModel.init(database);
SalaModel.init(database);
ReservaModel.init(database);

// relationships
UsuarioModel.associate(database.models)
SalaModel.associate(database.models);
ReservaModel.associate(database.models);

module.exports = database;
