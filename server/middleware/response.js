const okResponse = (res, json) => res.status(200).json(json);

const createdResponse = (res, json) => res.status(201).json(json);

module.exports = {
    OKResponse: okResponse,
    CreatedResponse: createdResponse
}