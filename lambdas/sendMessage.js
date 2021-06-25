const AWS = require('aws-sdk');
const DDB = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: 'us-east-1',
});

exports.handler = (event, context, callback) => {
  console.log('event: ', event);
  const { message, username, isBotMessage } = JSON.parse(event.body);

  const apiGateway = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: `${event.requestContext.domainName}/${event.requestContext.stage}`,
  });

  const scanParams = {
    TableName: 'connections',
  };
  DDB.scan(scanParams, function(err, data) {
    // for each data item, send some stuff
    data.Items.forEach((connection) => {
      const postParams = {
        ConnectionId: connection.connectionId.S,
        Data: JSON.stringify({ message, username, isBotMessage }),
      };
      apiGateway.postToConnection(postParams, (postError, postData) => {
        if (postError && postError.statusCode === 410) {
          console.log(`Found stale connection, deleting ${connection.connectionId.S}`);
          const deleteParams = {
            TableName: 'connections',
            Key: {
              connectionId: connection.connectionId,
            }
          };
          DDB.deleteItem(deleteParams, (deleteError, deleteData) => {
            console.log('deleteError: ', deleteError);
            console.log('deleteData: ', deleteData);
          });
        } else if (postError) {
          console.log(`Failed to post. Error: ${JSON.stringify(err)}`);
        }
      });
    });
  });
  return {};
};
