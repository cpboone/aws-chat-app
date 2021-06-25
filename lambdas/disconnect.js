const AWS = require('aws-sdk');

const DDB = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: 'us-east-1',
});

exports.handler = function(event, context, callback) {
  var deleteParams = {
    TableName: 'connections',
    Key: {
      connectionId: { S: event.requestContext.connectionId },
    },
  };

  DDB.deleteItem(deleteParams, function(err) {
    callback(null, {
      statusCode: err ? 500 : 200,
      body: err ? `Failed to disconnect: ${JSON.stringify(err)}` : 'Disconnected.',
    });
  });
};
