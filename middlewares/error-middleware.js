const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

class ErrorMiddleware {
    static defaultProblemDetails = {
        title: 'INTERNAL SERVER ERROR',
        status: StatusCodes.INTERNAL_SERVER_ERROR,
    }
    static problemTypes = [
        {
            matchErrorClass: [createError.BadRequest],
            details: {
                title: "BAD REQUEST",
                error: "Invalid payload",
                status: StatusCodes.BAD_REQUEST
            }
        },
        {
            matchErrorClass: [createError.Unauthorized],
            details: {
                title: "UNAUTHORIZED",
                error: "Unauthorized",
                status: StatusCodes.UNAUTHORIZED
            }
        },
        {
            matchErrorClass: [createError.Forbidden],
            details: {
                title: "FORBIDDEN",
                error: "Forbidden",
                status: StatusCodes.FORBIDDEN
            }
        },
        {
            matchErrorClass: [createError.NotFound],
            details: {
                title: "NOT FOUND",
                error: "Resource not found",
                status: StatusCodes.NOT_FOUND
            }
        },
        {
            matchErrorClass: [createError.Conflict],
            details: {
                title: "CONFLICT",
                error: "Conflict",
                status: StatusCodes.CONFLICT
            }
        },
    ]

    static errorMiddleware(err, req, res, next) {
        const problemTypes = ErrorMiddleware.problemTypes.find((type) => {
            return type.matchErrorClass.some((errorClass) => {
                return err instanceof errorClass
            })
        })

        let problemDetails = problemTypes ? problemTypes.details : ErrorMiddleware.defaultProblemDetails
        problemDetails.error = err.message ? err.message : problemDetails.error

        res.status(problemDetails.status).send(problemDetails)
        next()
    }
}

module.exports = ErrorMiddleware