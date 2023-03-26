import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';

const checkAccessTokenMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization') : null);

    if (token) {
      const secretKey: string = SECRET_KEY;
      await verify(token, secretKey);

      next();
    } else {
      next(new HttpException(404, 'Authorization token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong Authorization token'));
  }
};

export default checkAccessTokenMiddleware;
