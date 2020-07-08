const logger = require("../util/logger");

module.exports = function (err, _req, res, _next) {
    logger.error(err.stack);

    res.status(err.statusCode || 500).send(
        err.statusCode && err.statusCode === 400 ? "Invalid payload" : "Server error. Failed to process request – try again later."
    );
};
