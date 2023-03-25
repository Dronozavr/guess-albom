import { NextFunction, Request, Response } from 'express';
import bandService from '@services/band.service';
import assessmentService from '@/services/assessment.service';
import albumService from '@/services/album.service';
import tokenService from '@/services/token.service';
import { Assessment } from '@/interfaces/assessment.interface';
import { TokenDto } from '@/dtos/token.dto';
import { UserAnswerDto } from '@/dtos/user-answer.dto';
import { Album } from '@/interfaces/album.interface';
import { AssessmentDto } from '@/dtos/assessment.dto';

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

      // Generate tokenDto
      const cookie = await this.generateCookie(assessment);
      res.setHeader('Set-Cookie', [cookie]);

      // Generate AssessmentDto
      const assessmentDto = this.generateAssessmentDto(assessment.albums[0]);
      res.status(200).json(assessmentDto);
    } catch (error) {
      next(error);
    }
  };

  public checkAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenData = this.tokenService.decodeToken(req.cookies['X-Assessment']);
      const assessment = await this.assessmentService.findById(tokenData.testId);
      let cookie;
      let assessmentDto;
      // Check if test has passed
      if (assessment.bandId === req.body.bandId) {
        // End with correct screen
        cookie = await this.generateCookie(assessment, 5, true);
        assessmentDto = this.generateAssessmentDto(null, true);
        // Clean assessment
        await this.assessmentService.removeById(tokenData.testId);
      } else if (tokenData.attemptNumber === 4) {
        // End with failure screen
        cookie = await this.generateCookie(assessment, 5, false);
        assessmentDto = this.generateAssessmentDto(null, false);
        // Clean assessment
        await this.assessmentService.removeById(tokenData.testId);
      } else {
        // Next attempt
        const attemptNumber = tokenData.attemptNumber + 1;
        cookie = await this.generateCookie(assessment, attemptNumber);
        assessmentDto = this.generateAssessmentDto(assessment.albums[attemptNumber], false);
      }

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json(assessmentDto);
    } catch (error) {
      next(error);
    }
  };

  public createTokenDto(assessment: Assessment, attemptNumber = 0, isSuccess = false): TokenDto {
    return { testId: assessment._id, attemptNumber, isSuccess };
  }

  public generateAssessmentDto(album: Album, isSuccess = false): AssessmentDto {
    return { questionAlbum: album, isSuccess };
  }

  public async generateCookie(assessment: Assessment, attemptNumber = 0, isSuccess = false): Promise<string> {
    const tokenDto = { testId: assessment._id, attemptNumber, isSuccess };
    const tokenData = await this.tokenService.createToken(tokenDto);
    const cookie = await this.tokenService.createCookie(tokenData);
    return cookie;
  }
}

export default AssessmentController;
