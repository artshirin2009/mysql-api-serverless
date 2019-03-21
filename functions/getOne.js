'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');



module.exports.getOne = (event, context, callback) => {
    mysql
    .createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })
    .then(function (conn) {
      var result = conn.query(`SELECT * FROM users WHERE id=${event.pathParameters.id}`);
      conn.end();
      return result;
    })
    .then(function (results) {
      const response = {
        statusCode: 200,
        body: JSON.stringify(results)
      }
      callback(null, response);
    })        
}
