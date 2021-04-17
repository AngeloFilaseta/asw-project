const okResponse = (res, json) => res.status(200).json(json);

const downloadResponse= (res, fileName) => res.status(200).download(fileName);

const createdResponse = (res, json) => res.status(201).json(json);

const acceptedResponse = (res, json) => res.status(202).json(json);

module.exports = {
    OKResponse: okResponse,
    CreatedResponse: createdResponse,
    DownloadResponse: downloadResponse,
    AcceptedResponse: acceptedResponse
}