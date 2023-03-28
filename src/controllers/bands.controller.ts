import { NextFunction, Request, Response } from 'express';
import { Band } from '@interfaces/band.interface';
import bandService from '@services/band.service';

class BandsController {
  public bandService = new bandService();

  public getBands = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const allBands: Band[] = await this.bandService.findAllBands();

      res.status(200).json({ data: allBands });
    } catch (error) {
      next(error);
    }
  };
}

export default BandsController;
