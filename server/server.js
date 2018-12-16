require('./config/config');
const express = require('express');
const parser = require('body-parser');

const port = process.env.PORT;

// set up express
var app = express();
app.use(parser.json());

// import user routes
require('./routes/user-routes')(app);

// import task routes
require('./routes/task-routes')(app);

// start request listener
if (!module.parent) {
    app.listen(port, () => {
        console.log(`Listening on port [${port}] ...`);
    });
}

module.exports = { app };