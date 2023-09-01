const { Model, DataTypes } = require("sequelize");

class UsuarioModel extends Model {
    static init(database) {
        super.init({
            email: DataTypes.STRING(255),
            senha: DataTypes.STRING(255),
            nome: DataTypes.STRING(255),
        }, {
            tableName: 'usuario',
            modelName: 'Usuario',
            timestamps: false,
            sequelize: database
        });
    }
    
}

module.exports = { UsuarioModel };
