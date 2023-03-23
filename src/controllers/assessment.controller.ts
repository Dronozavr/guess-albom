import { NextFunction, Request, Response } from 'express';
import { Band } from '@interfaces/band.interface';
import bandService from '@services/band.service';
import assessmentService from '@/services/assessment.service';
import albumService from '@/services/album.service';

class AssessmentController {
  public bandService = new bandService();
  public assessmentService = new assessmentService();
  public albumService = new albumService();

  public generateAssessment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bands = await this.bandService.findAllBands();
      const choosedBand = bands[(Math.random() * 9).toFixed()];
      const albums = await this.albumService.getAlbums(choosedBand);
      const assessment = await this.assessmentService.createAssessment(choosedBand, albums);

      res.status(200).json(assessment);
    } catch (error) {
      next(error);
    }
  };
}

export default AssessmentController;
