import { NextFunction, Request, Response } from 'express';
import { Band } from '@interfaces/band.interface';
import bandService from '@services/band.service';
import assessmentService from '@/services/assessment.service';
import albumService from '@/services/album.service';
import tokenService from '@/services/token.service';
import { Assessment } from '@/interfaces/assessment.interface';
import { AssessmentDto } from '@/dtos/assessment.dto';
import { TokenDto } from '@/dtos/token.dto';

class AssessmentController {
  public bandService = new bandService();
  public assessmentService = new assessmentService();
  public albumService = new albumService();
  public tokenService = new tokenService();

  public generateAssessment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bands = await this.bandService.findAllBands();
      const choosedBand = bands[(Math.random() * 9).toFixed()];
      const albums = await this.albumService.getAlbums(choosedBand);
      const assessment = await this.assessmentService.createAssessment(choosedBand, albums);

      // Generate AssessmentDto
      const tokenDto = this.convertAssessmentToDto(assessment);
      const tokenData = await this.tokenService.createToken(tokenDto);
      const cookie = await this.tokenService.createCookie(tokenData);
      res.setHeader('Set-Cookie', [cookie]);

      // Generate AssessmentDto
      const assessmentDto = { questionAlbum: assessment.albums[tokenDto.attemptNumber] };
      res.status(200).json(assessmentDto);
    } catch (error) {
      next(error);
    }
  };

  public convertAssessmentToDto(assessment: Assessment): TokenDto {
    return { testId: assessment.id, attemptNumber: 0 };
  }
}

export default AssessmentController;
