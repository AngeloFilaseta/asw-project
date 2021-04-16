const unauthorizedError = (res, json) => res.status(401).json(json);

const notFoundError = (res, json) => res.status(404).json(json);

const conflictError = (res, json) => res.status(409).json(json);

const internalServerError = (res, err) => {
    if (!err.status) {
        console.error(err.stack)
    }
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' })
}



module.exports = {
    UnauthorizedError: unauthorizedError,
    NotFoundError: notFoundError,
    ConflictError: conflictError,
    ServerError: internalServerError
}