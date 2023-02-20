const { TableClient } = require("@azure/data-tables");
const { DefaultAzureCredential } = require("@azure/identity");

const tableClient = new TableClient(process.env.TABLE_CONNECTION_STRING, "users",
    new DefaultAzureCredential());

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const entity = await tableClient.getEntity(req.params.id, req.params.id);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: entity
    };
}