const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");
const GameFactory = require("../models/factory/game");
const UserInGameFactory = require("../models/factory/userInGame")
const DateUtil = require('../util/DateUtil')
const Structures = require("../util/Structures");
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const documentFolder = require("../conf/conf").documentFolder;

PDFDocument.prototype.addSVG = function(svg, x, y, options) {
    return SVGtoPDF(this, svg, x, y, options), this;
};

function storeGame(req, res) {
    let newGame = GameFactory.createGame(req.body.time_start, req.body.time_end);
    newGame.save(function(err, game){
        if(err){
            Errors.ServerError(res, err.message)
        }
        let newGameId = game._id;
        req.body.forEach((player) => {
            let pdfName = storePDF( player.username, player.sentences, player.drawings)
            let newUserInGame = UserInGameFactory.createUserInGame(player.id_user, newGameId, pdfName);
            newUserInGame.save(function (err) {
                if (err) {
                    Errors.ServerError(res, err.message)
                }
            }).catch(err => {
                Errors.ServerError(res, {message: err.message});
            });
        });
    }).then(() => {
        Responses.OKResponse(res, newGame);
    }).catch(err => {
        Errors.ServerError(res, {message: err.message});
    });
}

function storePDF(ownerUsername, sentences, drawings) {
    let fileName =  ownerUsername + " " + DateUtil.getDateAndTimeWellFormatted() + ".pdf"
    let sentencesIter = Structures.iterator(sentences);
    let drawingsIter = Structures.iterator(drawings);
    generatePDF(fileName, sentencesIter, drawingsIter);
    return fileName
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

module.exports = {storeGame}
