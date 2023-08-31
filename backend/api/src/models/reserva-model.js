const { Model, DataTypes } = require("sequelize");

class ReservaModel extends Model {
    static init(database) {
        super.init({
            estado: DataTypes.BOOLEAN,
            nomeResponsavel: DataTypes.STRING(255),
            dia: DataTypes.DATEONLY,
            horario: DataTypes.TIME,
            /*chaves estrangeiras verificar*/
        }, {
            tableName: 'reserva',
            modelName: 'Reserva',
            timestamps: false,
            sequelize: database
        });
    }

    
    static associate(models) {
        this.belongsTo(models.Sala, { foreignKey: 'idSala' });
        this.belongsTo(models.Usuario, { foreignKey: 'idUsuario' })
    }
    
}

module.exports = { ReservaModel };
