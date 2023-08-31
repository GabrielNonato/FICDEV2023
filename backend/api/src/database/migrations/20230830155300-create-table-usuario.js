'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('usuario', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            senha: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            nome: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            dataNascimento: {
                type: Sequelize.DATEONLY,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('usuario');
    }
};
