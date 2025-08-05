import createError from 'http-errors';

export function middlewareExpressHttpError(req, res, next) {
    next(createError(404));
}