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
            nomeResponsavel: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            dia: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            horarioInicio: {
                type: Sequelize.TIME,
                allowNull: false
            },
            horarioFim: {
                type: Sequelize.TIME,
                allowNull: false
            },
            SalaId: {
                type: Sequelize.INTEGER,
                references: {
                  model: 'sala',
                  key: 'id'
                },
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('reserva');
    }
};
