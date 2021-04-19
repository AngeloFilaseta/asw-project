const fs = require('fs')
const Languages = require("../models/enum/language")
const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");
const GameFactory = require("../models/factory/game");
const UserInGame = require("../models/userInGame");
const UserInGameFactory = require("../models/factory/userInGame")
const DateUtil = require('../util/DateUtil')
const Structures = require("../util/Structures");
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const DOCUMENT_FOLDER = require("../conf/conf").documentFolder;

function getLanguages(req, res) {
    if(Languages !== undefined && Languages !== null && Languages !== []){
        Responses.OKResponse(res, Languages );
    } else {
        Errors.ServerError(res, {message: "A problem occurred, no languages found."})
    }
}

async function getAllParticipatedGamesReport(req, res) {
    await UserInGame.find({ id_user: req.user.id})
        .then(async userInGames => {
            let participatedGamesId = userInGames.map(userInGame => (userInGame.id_game));
            await UserInGame.find({ id_game: { "$in" : participatedGamesId} })
                .then(allParticipatedGames => {
                    Responses.OKResponse(res, allParticipatedGames);
                })
                .catch(err => {
                    Errors.ServerError(res, err.message);
            });
        }).catch(err => {
        Errors.ServerError(res, err.message);
    });
}

async function downloadReport(req, res) {
    await UserInGame.findById(req.query["id_report"], function(err, userInGame){
        if(err){
            Errors.ServerError(res, err.message);
        }
        let path = DOCUMENT_FOLDER + userInGame.report_name;
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                Errors.NotFoundError(res, {message: err.message});
            }
            Responses.DownloadResponse(res, path);
        })
    })
}

PDFDocument.prototype.addSVG = function(svg, x, y, options) {
    return SVGtoPDF(this, svg, x, y, options);
};

async function storeGame(req, res) {
    let newGame = GameFactory.createGame(req.body.time_start, req.body.time_end);
    await newGame.save(function(err, game){
        if(err){
            Errors.ServerError(res, err.message)
        }
        let newGameId = game._id;
        req.body["players"].forEach((player) => {
            let pdfName = storePDF( player.username, player["sentences"], player["drawings"])
            let newUserInGame = UserInGameFactory.createUserInGame(player.id_user, newGameId, pdfName);
            newUserInGame.save().catch(err => {
                Errors.ServerError(res, {message: err.message});
            });
        });
        Responses.OKResponse(res, newGame);
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
    doc.pipe(fs.createWriteStream(DOCUMENT_FOLDER + fileName));
    do {
        nextSent = sentenceIterator.next();
        doc.text(nextSent.value, 50, 100);
        doc.addSVG(drawingIterator.next().value, 50, 200);
        if(!nextSent.done){
            doc.addPage();
        }
    } while(!nextSent.done)
    doc.end();
}

module.exports = {
    getLanguages,
    downloadReport,
    storeGame,
    getAllParticipatedGamesReport
};
