'use strict';
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authentication-token, application/json,charset=utf-8");
    next();
});


require("./config/connections");
require("./config/routes")(app);
require("./config/errorHandler")(app);
require("./config/auth");


const PORT =9000;

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});