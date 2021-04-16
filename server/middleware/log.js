const logger = function (req, res, next) {
    let currentDate = new Date();
    console.log("\nRequest: "+ req.method + "  "
        + "at: " + currentDate.getDate() + "/"
        + (currentDate.getMonth()+1)  + "/"
        + currentDate.getFullYear() + " - "
        + currentDate.getHours() + ":"
        + currentDate.getMinutes() + ":"
        + currentDate.getSeconds());
    console.log("Request Header:" +  JSON.stringify(req.headers));
    console.log("Query Params:" +  JSON.stringify(req.params));
    console.log("Request Body:" +  JSON.stringify(req.body));
    next()
}

module.exports = logger;