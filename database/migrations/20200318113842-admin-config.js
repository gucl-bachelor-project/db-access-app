'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(_t => {
            return Promise.all([
                queryInterface.createTable("Configs", {
                    id: {
                        type: Sequelize.DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    name: {
                        type: Sequelize.DataTypes.STRING,
                        allowNull: false
                    },
                    enabled: {
                        type: Sequelize.DataTypes.BOOLEAN,
                        allowNull: false
                    }
                })
            ]);
        });
    },
    down: (queryInterface, _Sequelize) => {
        return Promise.all([
            queryInterface.dropTable("Configs")
        ]);
    }
};
