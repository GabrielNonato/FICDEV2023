const { Model, DataTypes } = require("sequelize");

class ReservaModel extends Model {
    static init(database) {
        super.init({
            estado: DataTypes.BOOLEAN,
            nomeResponsavel: DataTypes.STRING(255),
            dia: DataTypes.DATEONLY,
            horario: DataTypes.TIME,
            idSala: DataTypes.INTEGER
        }, {
            tableName: 'reserva',
            modelName: 'Reserva',
            timestamps: false,
            sequelize: database
        });
    }

    
    static associate(models) {
        this.belongsTo(models.Sala, { foreignKey: 'idSala' });
    }
    
}

module.exports = { ReservaModel };
