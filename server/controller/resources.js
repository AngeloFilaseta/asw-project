const Languages = require("../models/enum/language")
const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");

function getLanguages(req, res) {
    if(Languages !== undefined && Languages !== null && Languages !== []){
        Responses.OKResponse(res, Languages );
    } else {
        Errors.ServerError(res, {message: "A problem occurred, no languages found."})
    }
}

module.exports = {getLanguages};


