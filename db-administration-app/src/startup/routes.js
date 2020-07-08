const express = require('express');
const documentsRoute = require('../routes/documents');
const usersRoute = require('../routes/users');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/documents', documentsRoute);
    app.use('/api/users', usersRoute);
    app.use(error);
};
