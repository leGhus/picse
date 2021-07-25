import { UnauthorizedError } from '../error/errors';
import { Request, Response } from 'express';
import keys from '../../keys';

const isAuthorized = (
  req: Request,
  res: Response,
  next: () => void,
): void => {
  if (!keys.map((key: { client: string; key: string }) => key.key).includes(req.headers?.authorization)) {
    throw new UnauthorizedError();
  }
  return next();
};

export default isAuthorized;