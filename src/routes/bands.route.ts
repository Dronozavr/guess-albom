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
    // this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default BandsRoute;
