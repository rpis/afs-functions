const { TableClient } = require("@azure/data-tables");
const { DefaultAzureCredential } = require("@azure/identity");
const df = require("durable-functions");

const tableClient = new TableClient(process.env.TABLE_CONNECTION_STRING, "users",
    new DefaultAzureCredential());

module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);

    try {
        const entity = await tableClient.createEntity({
            partitionKey: myQueueItem.id,
            rowKey: myQueueItem.id,
            name: myQueueItem.name,
            email: myQueueItem.email,
            status: "INACTIVE"
        });
        const client = df.getClient(context);
        const body = {
          id: myQueueItem.id,
        };
        const instanceId = await client.startNew(
          'on-boarding-orchestrator',
          undefined,
          body,
        );
        console.log("Process started! id = " + instanceId)
    } catch (e) {
        console.log(e);
    };

};