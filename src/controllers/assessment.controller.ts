import { NextFunction, Request, Response } from 'express';
import bandService from '@services/band.service';
import assessmentService from '@/services/assessment.service';
import albumService from '@/services/album.service';
import tokenService from '@/services/token.service';
import { Assessment } from '@/interfaces/assessment.interface';
import { TokenDto } from '@/dtos/token.dto';
import { Album } from '@/interfaces/album.interface';
import { AssessmentResponseDto } from '@/dtos/assessment.response.dto';
import fileService from '@/services/file.service';

class AssessmentController {
  public bandService = new bandService();
  public assessmentService = new assessmentService();
  public albumService = new albumService();
  public tokenService = new tokenService();
  public fileService = new fileService();

  public checkIfExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenData = this.tokenService.decodeToken(req.cookies['X-Assessment']);
      if (tokenData?.testId) {
        const assessment = await this.assessmentService.findById(tokenData.testId);

        if (assessment) {
          res.status(200).json({ isExist: true });
          return;
        }
      }
      res.status(200).json({ isExist: false });
    } catch (error) {
      next(error);
    }
  };

  public getAssessment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let assessmentDto;

      const tokenData = this.tokenService.decodeToken(req.cookies['X-Assessment']);

      if (tokenData?.testId && tokenData.attemptNumber < 5) {
        // Existed assessment
        const assessment = await this.assessmentService.findById(tokenData.testId);
        assessmentDto = this.generateAssessmentResponseDto(assessment.albums[tokenData.attemptNumber], tokenData.attemptNumber);
      } else {
        // New assesmsent
        const bands = await this.bandService.findAllBands();
        const choosedBand = bands[(Math.random() * 9).toFixed()];
        const { albums, created } = await this.albumService.getAlbums(choosedBand);

        if (created) {
          await this.fileService.recordAlbums(albums, choosedBand.name);
        }
        const assessment = await this.assessmentService.createAssessment(choosedBand, albums);

        // Generate tokenDto
        const assessmentCookie = await this.generateAssessmentCookie(assessment);
        res.setHeader('Set-Cookie', [assessmentCookie]);

        // Generate AssessmentDto
        assessmentDto = this.generateAssessmentResponseDto(assessment.albums[0]);
      }

      res.status(200).json(assessmentDto);
    } catch (error) {
      next(error);
    }
  };

  public answer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenData = this.tokenService.decodeToken(req.cookies['X-Assessment']);
      const assessment = await this.assessmentService.findById(tokenData.testId);
      let cookie;
      let isSuccess = false;
      // Check if test has passed
      if (assessment.bandId === req.body.bandId) {
        // User passed assessment. Finish.
        cookie = await this.generateAssessmentCookie(assessment, 5, true);
        isSuccess = true;
      } else if (tokenData.attemptNumber === 4) {
        // User failed all assessment's attempts. Finish.
        cookie = await this.generateAssessmentCookie(assessment, 5, false);
        // Clean assessment
        await this.assessmentService.removeById(tokenData.testId);
        res.clearCookie('X-Assessment');
      } else {
        // User failed assessment. Next attempt
        const attemptNumber = tokenData.attemptNumber + 1;
        cookie = await this.generateAssessmentCookie(assessment, attemptNumber);
      }

      res.setHeader('Set-Cookie', [cookie]);
      res.setHeader('Authorization', 'hi-there');
      res.setHeader('Authorization', 'hi-there');
      res.setHeader('Authorization', 'hi-there');
      res.setHeader('Authorization', 'hi-there');
      res.setHeader('Authorization', 'hi-there');
      res.setHeader('Authorization', 'hi-there');
      res.setHeader('Authorization', 'hi-there');
      res.setHeader('Authorization', 'hi-there');
      res.status(200).json({ isSuccess });
    } catch (error) {
      next(error);
    }
  };

  public createTokenDto(assessment: Assessment, attemptNumber = 0, isSuccess = false): TokenDto {
    return { testId: assessment._id, attemptNumber, isSuccess };
  }

  public generateAssessmentResponseDto(album: Album, attemptNumber = 0): AssessmentResponseDto {
    return { questionAlbum: album, attemptNumber };
  }

  public async generateAssessmentCookie(assessment: Assessment, attemptNumber = 0, isSuccess = false): Promise<string> {
    const tokenDto = { testId: assessment._id, attemptNumber, isSuccess };
    const tokenData = await this.tokenService.createToken(tokenDto);
    const cookie = await this.tokenService.createAssessmentCookie(tokenData);

    return cookie;
  }
}

export default AssessmentController;
