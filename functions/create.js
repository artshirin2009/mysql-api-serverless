'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');

module.exports.create = (event, context, callback) => {

  mysql
    .createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })
    .then((conn) => {
      var data = JSON.parse(event.body);
      var promises = data.map(item => new Promise((resolve) => {
        item.age = parseInt(item.age);
        conn.query(`INSERT INTO users (name, age) VALUES ('${item.name}', '${item.age}')`);
        console.log(item)
        resolve(item);
      }));
      Promise.all(promises).then(res => {
        conn.end();
        const response = {
          statusCode: 200,
          body: JSON.stringify(res)
        }
        callback(null, response);
      })
    })
    .catch(err => console.log(err))
}