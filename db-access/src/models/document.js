const Joi = require('joi');

const schema = function (sequelize, DataTypes) {
    return sequelize.define("Document", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        pub_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        author_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        }
    });
};

function validateCreation(payload) {
    const schema = {
        title: Joi.string().required(),
        content: Joi.string().required(),
        pub_date: Joi.date()
            .iso()
            .required(),
        author_user_id: Joi.number().positive().required()
    };

    return Joi.validate(payload, schema);
}

exports.default = schema;
exports.validateCreation = validateCreation;
