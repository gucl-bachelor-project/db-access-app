'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(_t => {
            return Promise.all([
                queryInterface.createTable("Users", {
                    id: {
                        type: Sequelize.DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    first_name: {
                        type: Sequelize.DataTypes.STRING,
                        allowNull: false
                    },
                    last_name: {
                        type: Sequelize.DataTypes.STRING,
                        allowNull: false
                    },
                    gender: {
                        type: Sequelize.DataTypes.ENUM('male', 'female', 'other'),
                        allowNull: false
                    }
                }),
                queryInterface.createTable("Documents", {
                    id: {
                        type: Sequelize.DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    title: {
                        type: Sequelize.DataTypes.STRING,
                        allowNull: false
                    },
                    content: {
                        type: Sequelize.DataTypes.TEXT,
                        allowNull: false
                    },
                    pub_date: {
                        type: Sequelize.DataTypes.DATE,
                        allowNull: false
                    },
                    author_user_id: {
                        type: Sequelize.DataTypes.INTEGER,
                        allowNull: false,
                        references: {
                            model: {
                                tableName: "Users"
                            },
                            key: "id"
                        }
                    }
                })
            ]);
        });
    },

    down: (queryInterface, _Sequelize) => {
        return queryInterface.sequelize.transaction(_t => {
            return Promise.all([
                queryInterface.dropTable("Documents"),
                queryInterface.dropTable("Users")
            ]);
        });
    }
};
