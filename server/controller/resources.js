const fs = require('fs')
const PDFDocument = require('pdfkit');
const Languages = require("../models/enum/language")
const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");
const documentFolder = require("../conf/conf").documentFolder;
const SVGtoPDF = require('svg-to-pdfkit');
const DateUtil = require('../util/DateUtil')
const Structures = require("../util/Structures");

PDFDocument.prototype.addSVG = function(svg, x, y, options) {
    return SVGtoPDF(this, svg, x, y, options), this;
};

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

function storeReport(req, res) {
    console.log(req.body.sentences, req.body.drawings, req.body.id_user);
    let owner = req.body.id_user; //TODO ... do I really nedd this?
    let fileName =  owner + " " + DateUtil.getDateAndTimeWellFormatted() + ".pdf"
    let sentencesIter = Structures.iterator(req.body.sentences);
    let drawingsIter = Structures.iterator(req.body.drawings);
    generatePDF(fileName, sentencesIter, drawingsIter);

    Responses.CreatedResponse(res, {report: fileName})
}

function generatePDF(fileName, sentenceIterator, drawingIterator){
    let nextSent;
    let doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(documentFolder + fileName));
    do {
        nextSent = sentenceIterator.next();
        doc.text(nextSent.value, 50, 100);
        doc.addSVG(drawingIterator.next().value, 50, 200);
        if(!nextSent.done){
            doc.addPage();
        }
    }while(!nextSent.done)
    doc.end();
}

module.exports = {
    getLanguages,
    downloadReport,
    storeReport,
};
