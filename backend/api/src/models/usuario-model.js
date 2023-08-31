const { Model, DataTypes } = require("sequelize");

class UsuarioModel extends Model {
    static init(database) {
        super.init({
            email: DataTypes.STRING(255),
            senha: DataTypes.STRING(255),
            nome: DataTypes.STRING(255),
            dataNascimento: DataTypes.DATEONLY
        }, {
            tableName: 'usuario',
            modelName: 'Usuario',
            timestamps: false,
            sequelize: database
        });
    }

    
    static associate(models) {
        this.hasMany(models.Reserva, { foreignKey: 'idUsuario' });
    }
    
}

module.exports = { UsuarioModel };
