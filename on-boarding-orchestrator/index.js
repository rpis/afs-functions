
const df = require("durable-functions");
const moment = require('moment');

module.exports = df.orchestrator(function* (context) {
    const outputs = [];
    outputs.push(yield context.df.callActivity("check-customer-activity",context.df.getInput()));
    
    console.log('Timer start');
    const nextCheck = moment.utc(context.df.currentUtcDateTime).add(30, 's');
    yield context.df.createTimer(nextCheck.toDate());
    console.log('Timer end');
    
    outputs.push(yield context.df.callActivity("finalize-activity", context.df.getInput()));
    return outputs;
});