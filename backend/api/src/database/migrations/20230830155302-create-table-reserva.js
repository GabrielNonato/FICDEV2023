'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('reserva', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            estado: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            nomeResponsavel: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            dia: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            horario: {
                type: Sequelize.TIME,
                allowNull: false
            },
            idSala: {
                type: Sequelize.INTEGER,
                references: {
                  model: {
                    tableName: 'sala',
                  },
                  key: 'id'
                },
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('reserva');
    }
};
