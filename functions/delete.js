'use strict'
const uuid = require('uuid');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {

    var params = {
        TableName: 'todos',
        Key: {
            id: event.pathParameters.id
        }
    }

    documentClient.delete(params, (error, result) => {
        if (error) {
            console.log(error)
            callback(new Error('Couldn\'t create todo item'))
            return;
        }

        console.log('event - ')
        console.log(event)
        callback(null, result)
    })
}