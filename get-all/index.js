const response = [{
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@wp.pl"
},{
    "id": 2,
    "name": "Katerina Pavelkova",
    "email": "k.pav@nevi.cz"
}]

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('Response: ' + JSON.stringify(response));
    context.res = {
        status: 200, /* Defaults to 200 */
        body: response
    }; 
}