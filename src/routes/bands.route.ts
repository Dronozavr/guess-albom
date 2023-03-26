import { Router } from 'express';
import BandsController from '@controllers/bands.controller';
import { Routes } from '@interfaces/routes.interface';

class BandsRoute implements Routes {
  public path = '/bands';
  public router = Router();
  public bandsController = new BandsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.bandsController.getBands);
    // This route is redundant
    // this.router.get(`/:id/alboms`, this.indexController.getAlbums);
  }
}

export default BandsRoute;
