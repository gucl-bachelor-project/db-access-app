const Joi = require('joi');

const schema = function (sequelize, DataTypes) {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: false
        }
    });
};

function validateCreation(payload) {
    const schema = {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        gender: Joi.string().valid('male', 'female', 'other').required()
    };

    return Joi.validate(payload, schema);
}

exports.default = schema;
exports.validateCreation = validateCreation;
