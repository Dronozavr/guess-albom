import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import AssessmentController from '@/controllers/assessment.controller';
import checkTokenMiddleware from '@/middlewares/check-token.middleware';
import checkAccessTokenMiddleware from '@/middlewares/check-access-token.middleware';

class AssessmentsRoute implements Routes {
  public path = '/assessments';
  public router = Router();
  public assessmentController = new AssessmentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.assessmentController.generateAssessment);
    this.router.post(`${this.path}`, checkAccessTokenMiddleware, checkTokenMiddleware, this.assessmentController.checkAnswer);
  }
}

export default AssessmentsRoute;
