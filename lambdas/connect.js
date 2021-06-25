const AWS = require('aws-sdk');
const DDB = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: 'us-east-1',
});

exports.handler = function(event, context, callback) {
  console.log('event: ', event);
  var putParams = {
    TableName: 'connections',
    Item: {
      connectionId: { S: event.requestContext.connectionId },
    }
  };

  DDB.putItem(putParams, function(err, data) {
    callback(null, {
      statusCode: err ? 500 : 200,
      body: err ? `Failed to connect: ${JSON.stringify(err)}` : 'Connected.'
    });
  });
};
