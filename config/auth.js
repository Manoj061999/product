
'use strict';

const httpErrors = require('http-errors');
const JWT = require('jsonwebtoken');

const verifyJWT = (req,res,cb) => {

    var token = req.headers['token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    console.log(process.env.JWT_SECRET_KEY)
    JWT.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {

     if(err)
     {
        res.status(200).send({ auth: false, message: 'Invalid Token' });
     }
     else
     {
        cb();
     }   
     
    });
  };

  module.exports = verifyJWT;