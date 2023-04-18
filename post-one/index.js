const { TableClient } = require("@azure/data-tables");
const { DefaultAzureCredential } = require("@azure/identity");
const df = require("durable-functions");

const tableClient = new TableClient(process.env.TABLE_CONNECTION_STRING, "users",
    new DefaultAzureCredential());

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.log(req.body);
    try {
        const entity = await tableClient.createEntity({
            partitionKey: req.body.id,
            rowKey: req.body.id,
            name: req.body.name,
            email: req.body.email,
            status: "INACTIVE"
        });
        const client = df.getClient(context);
        const body = {
          id: req.body.id,
        };
        const instanceId = await client.startNew(
          'on-boarding-orchestrator',
          undefined,
          body,
        );
        console.log("Process started! id = " + instanceId)
        context.res = {
            status: 201,
            body: entity
        };
    } catch (e) {
        console.log(e);
        context.res = {
            status: 400,
            body: e
        };

    }
}