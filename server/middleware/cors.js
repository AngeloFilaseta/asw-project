const {clientPort} = require("../conf/conf");
const {clientAddress} = require("../conf/conf");

function allowEverythingCorsPolicy (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

module.exports = allowEverythingCorsPolicy;