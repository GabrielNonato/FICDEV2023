const { Model, DataTypes } = require("sequelize");

class SalaModel extends Model {
    static init(database) {
        super.init({
            nome: DataTypes.STRING(255),
            departamento: DataTypes.STRING(255),
            capacidade: DataTypes.INTEGER
        }, {
            tableName: 'sala',
            modelName: 'Sala',
            timestamps: false,
            sequelize: database
        });
    }

    
    static associate(models) {
        this.hasMany(models.Reserva);
    }
    
}

module.exports = { SalaModel };
