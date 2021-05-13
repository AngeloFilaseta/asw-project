const fs = require('fs')
const Languages = require("../model/enum/language")
const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");
const GameFactory = require("../mongoose/model/factory/game");
const UserInGame = require("../mongoose/model/userInGame");
const UserInGameFactory = require("../mongoose/model/factory/userInGame")
const DateUtil = require('../util/DateUtil')
const Structures = require("../util/Structures");
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit')
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


async function storeGame(time_start, time_end, reports) {
    let newGame = GameFactory.createGame(time_start, time_end);
    await newGame.save(function(err, game) {
        if(err) {
            console.log("Error in saving game")
        }
        let newGameId = game._id;
        reports.forEach((report) => {
            let pdfName = storePDF( report.username, report.sentences, report.draws)
            let newUserInGame = UserInGameFactory.createUserInGame(report.id_user, newGameId, pdfName);
            newUserInGame.save().catch(err => {
                console.log("Error in saving user in game")
            });
        });
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
    nextSent = sentenceIterator.next();
    while(!nextSent.done){
        doc.text(nextSent.value, 50, 100);
        try {
            SVGtoPDF(doc, drawingIterator.next().value, 100, 300);
        }catch(e){
            //console.log(e)
        }
        nextSent = sentenceIterator.next();
        if(!nextSent.done){
            doc.addPage();
        }
    }
    doc.end();
}

module.exports = {
    getLanguages,
    downloadReport,
    storeGame,
    getAllParticipatedGamesReport
};
