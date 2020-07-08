const express = require('express');
require('express-async-errors');

const app = express();
const port = process.env.PORT || 8080;

require('./startup/routes')(app);

app.listen(port, () =>
    console.log(`DB admin administration app running on port ${port}`)
);
