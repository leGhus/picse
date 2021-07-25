import express, { NextFunction } from 'express';
import { CustomError, WS_ERRORS } from './errors';

export function errorHandler(
  error: CustomError,
  req: express.Request,
  res: express.Response,
  next?: NextFunction
): void {
  console.error(error)
  if (res.headersSent) {
    return next(error);
  } else {
    if (req && error) {
      if (
        error?.name === WS_ERRORS.BAD_REQUEST ||
        error?.name === WS_ERRORS.UNAUTHORIZED ||
        error?.name === WS_ERRORS.FORBIDDEN ||
        error?.name === WS_ERRORS.ERROR
      ) {
        res
          .status(error.statusCode ?? 500)
          .send({ error: { name: error.name, message: error.message } });
        return;
      }
      res.status(500).send({ error: WS_ERRORS.ERROR });
    }
  }
}
