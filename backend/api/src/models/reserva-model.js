const { Model, DataTypes } = require("sequelize");

class ReservaModel extends Model {
    static init(database) {
        super.init({
            nomeResponsavel: DataTypes.STRING(255),
            dia: DataTypes.DATEONLY,
            horarioInicio: DataTypes.TIME,
            horarioFim: DataTypes.TIME,
            SalaId: DataTypes.INTEGER
        }, {
            tableName: 'reserva',
            modelName: 'Reserva',
            timestamps: false,
            sequelize: database
        });
    }

    
    static associate(models) {
        this.belongsTo(models.Sala, { foreignKey: 'SalaId' });
    }
    
}

module.exports = { ReservaModel };
