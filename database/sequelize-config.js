module.exports = {
    development: {
        username: "test-user",
        password: "test-password",
        database: process.env.APP_DB_NAME,
        host: "mysql-db",
        dialect: "mysql",
        define: {
            timestamps: false
        }
    },
    production: {
        username: process.env.APP_DB_USERNAME,
        password: process.env.APP_DB_PASSWORD,
        database: process.env.APP_DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: "mysql",
        define: {
            timestamps: false
        }
    }
};
