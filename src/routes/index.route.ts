import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import AssessmentController from '@/controllers/assessment.controller';
import checkTokenMiddleware from '@/middlewares/check-token.middleware';
import UserController from '@/controllers/users.controller';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();
  public assessmentController = new AssessmentController();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);

    this.router.get('/assess', this.assessmentController.generateAssessment);
    this.router.post(`/answer`, checkTokenMiddleware, this.assessmentController.checkAnswer);
    this.router.post(`/user`, checkTokenMiddleware, this.assessmentController.checkAnswer);
    this.router.get(`/top`, this.userController.getTop);
  }
}

export default IndexRoute;
