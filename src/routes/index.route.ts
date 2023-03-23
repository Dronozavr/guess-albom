import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import AssessmentController from '@/controllers/assessment.controller';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();
  public assessmentController = new AssessmentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get('/assess', this.assessmentController.generateAssessment);
    this.router.get(`/albums/:id`, this.indexController.getAlbums);
  }
}

export default IndexRoute;
