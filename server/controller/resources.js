const fs = require('fs')
const Languages = require("../models/enum/language")
const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");
const documentFolder = require("../conf/conf").documentFolder;


function getLanguages(req, res) {
    if(Languages !== undefined && Languages !== null && Languages !== []){
        Responses.OKResponse(res, Languages );
    } else {
        Errors.ServerError(res, {message: "A problem occurred, no languages found."})
    }
}

function downloadReport(req, res) {
    let path = documentFolder + req.body.report;
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            Errors.NotFoundError(res, {message: err.message});
        }
        Responses.DownloadResponse(res, path);
    })
}

module.exports = {
    getLanguages,
    downloadReport
};
