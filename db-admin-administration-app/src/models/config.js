const Joi = require('joi');

const schema = function (sequelize, DataTypes) {
    return sequelize.define("Config", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
};

function validateCreation(payload) {
    const schema = {
        name: Joi.string().required(),
        enabled: Joi.boolean().required()
    };

    return Joi.validate(payload, schema);
}

exports.default = schema;
exports.validateCreation = validateCreation;
