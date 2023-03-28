import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import checkTokenMiddleware from '@/middlewares/check-token.middleware';
import UserController from '@/controllers/users.controller';
import checkSuccessMiddleware from '@/middlewares/check-success.middleware';

class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, checkTokenMiddleware, checkSuccessMiddleware, this.userController.addPoints);
    // Redundant route
    this.router.get(`/top-list`, this.userController.getTop);
  }
}

export default UserRoute;
