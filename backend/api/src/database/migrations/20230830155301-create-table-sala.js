'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sala', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            nome: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            departamento: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            capacidade: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            
          
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('sala');
    }
};
