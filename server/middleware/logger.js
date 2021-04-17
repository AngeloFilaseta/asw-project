const DateUtil = require('../util/DateUtil')

const logger = function (req, res, next) {
    console.log("\nRequest: "+ req.method + "  at: " + DateUtil.getDateAndTimeWellFormatted());
    console.log("Request Header:" +  JSON.stringify(req.headers));
    console.log("Query Params:" +  JSON.stringify(req.params));
    console.log("Request Body:" +  JSON.stringify(req.body));
    next()
}

module.exports = logger;