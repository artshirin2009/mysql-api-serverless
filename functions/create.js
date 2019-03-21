
'use strict'
require('dotenv').config();
var mysql = require('promise-mysql');


// module.exports.create = (event, context, callback) => {

//     mysql
//         .createConnection({
//             host: process.env.HOST,
//             user: process.env.USER,
//             password: process.env.PASSWORD,
//             database: process.env.DATABASE
//         })
//         .then((conn) => {
//             var data = JSON.parse(event.body);
//             var promises = data.map(item => new Promise((resolve) => {
//                 conn.query(`INSERT INTO users (name, age) VALUES ('${item.name}', '${item.age}')`)
//                 .then((res)=>{
//                     item.id = res.insertId;
//                     console.log(item);
//                     resolve(item);
//                 })
                
                
               
                
//             })
            
//             )

//             Promise.all(item).then(res => {
//                 conn.end();
//                 const response = {
//                     statusCode: 200,
//                     body: JSON.stringify(res)
//                 }
//                 callback(null, response);
//             })

//         })
//         .catch(err => console.log(err))
// }


















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
                const savedItem = conn.query(`INSERT INTO users (name, age) VALUES ('${item.name}', '${item.age}')`);
                
                item.id = savedItem.insertId;
                console.log(savedItem)
                resolve(savedItem);
            }))

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