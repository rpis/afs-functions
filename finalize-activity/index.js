const { TableClient } = require("@azure/data-tables");
const { DefaultAzureCredential } = require("@azure/identity");

const tableClient = new TableClient(process.env.TABLE_CONNECTION_STRING, "users",
    new DefaultAzureCredential());


module.exports = async function (context) {
    console.log("Processing id:"+context.bindings.name.id);
    var entity = await tableClient.getEntity(context.bindings.name.id,context.bindings.name.id);
    entity.status = "ACTIVE"
    await tableClient.updateEntity(entity);
    return "Finalize executed";
};