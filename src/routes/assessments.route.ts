import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import AssessmentController from '@/controllers/assessment.controller';
import checkTokenMiddleware from '@/middlewares/check-token.middleware';

class AssessmentsRoute implements Routes {
  public path = '/assessments';
  public router = Router();
  public assessmentController = new AssessmentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.assessmentController.getAssessment);
    this.router.get(`${this.path}/check`, this.assessmentController.checkIfExist);
    this.router.post(`${this.path}`, checkTokenMiddleware, this.assessmentController.answer);
  }
}

export default AssessmentsRoute;
