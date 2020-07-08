const express = require('express');
const configsRoute = require('../routes/configs');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/configs', configsRoute);
    app.use(error);
};
