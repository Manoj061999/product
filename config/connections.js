'use strict';
const mongoose = require('mongoose');
var url = "mongodb://127.0.0.1:27017/Node003";

mongoose.connect(url, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose Connected!`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose Disconnected`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Error while connecting ${err}`);
});