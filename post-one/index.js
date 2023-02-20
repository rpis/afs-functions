const { TableClient } = require("@azure/data-tables");

const tableClient = new TableClient(process.env.TABLE_CONNECTION_STRING, "users");

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
        context.res = {
            status: 201,
            body: entity
        };
    } catch (e) {
        context.res = {
            status: 400,
            body: e
        };

    }
}