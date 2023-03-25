import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { TokenDto } from '@/dtos/token.dto';

const checkSuccessMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['X-Assessment'] || (req.header('X-Assessment') ? req.header('X-Assessment') : null);

    if (token) {
      const secretKey: string = SECRET_KEY;
      const { isSuccess } = (await verify(token, secretKey)) as TokenDto;
      if (isSuccess) {
        next();
      } else {
        next(new HttpException(401, 'Wrong assessment token'));
      }
    } else {
      next(new HttpException(404, 'Assessment token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong assessment token'));
  }
};

export default checkSuccessMiddleware;
