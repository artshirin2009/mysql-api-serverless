//work only to get user by id

'use strict'
const uuid=require('uuid');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback)=>{


    var params = {
        TableName: 'todos',
        Key: {
            id: event.pathParameters.id
        }
    }

    documentClient.get(params, (error, result) => {
        if (error) {
            console.log(error)
            callback(new Error('Couldn\'t create todo item'))
            return;
        }
        console.log('event');
        console.log(event);

        console.log('result');
        console.log(result);

        
        const response = {
            statusCode: 200,
            body: JSON.stringify(result)
        }

        console.log("response");
        console.log(response)

        console.log('object')
        var object = { id : result.Item.id,
            text: result.Item.text,
            checked: result.Item.checked,
            createdAt: result.Item.createdAt,
            updatedAt: result.Item.updatedAt
            
        }


        callback(null, response)
    })



    // var timestamp = new Date().getTime();
    // var data = JSON.parse(event.body);

    // if (typeof data.text !=='string'){
    //     console.error('Validation Failed');
    //     callback(new Error('Couldn\'t create todo item'));
    //     return;
    // }
    // var params = {
    //     TableName: 'todos',
    //     Item: {
    //         id: uuid.v1(),
    //         text: data.text,
    //         checked: false,
    //         createdAt: timestamp,
    //         updatedAt: timestamp
    //     },
    //     ReturnValues: 'ALL_OLD'
    // }

    // documentClient.put(params, (error, result)=>{
    //     if (error) {
    //         console.log(error)
    //         callback(new Error('Couldn\'t create todo item'))
    //         return;
    //     }
    //     const response = {
    //         statusCode: 200,
    //         body: JSON.stringify(params.Item)
    //     }
    //     console.log('params - ' + params.Item)
    //     console.log('response.body - ' + response.body)
    //     callback(null, response)
    // })
}