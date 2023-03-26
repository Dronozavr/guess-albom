import { NextFunction, Request, Response } from 'express';
import bandService from '@services/band.service';
import assessmentService from '@/services/assessment.service';
import albumService from '@/services/album.service';
import tokenService from '@/services/token.service';
import { Assessment } from '@/interfaces/assessment.interface';
import { TokenDto } from '@/dtos/token.dto';
import { Album } from '@/interfaces/album.interface';
import { AssessmentDto } from '@/dtos/assessment.response.dto';
import fileService from '@/services/file.service';

class AssessmentController {
  public bandService = new bandService();
  public assessmentService = new assessmentService();
  public albumService = new albumService();
  public tokenService = new tokenService();
  public fileService = new fileService();

  public generateAssessment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bands = await this.bandService.findAllBands();
      const choosedBand = bands[(Math.random() * 9).toFixed()];
      const { albums, created } = await this.albumService.getAlbums(choosedBand);

      if (created) {
        await this.fileService.recordAlbums(albums, choosedBand.name);
      }
      const assessment = await this.assessmentService.createAssessment(choosedBand, albums);

      // Generate tokenDto
      const assessmentCookie = await this.generateAssessmentCookie(assessment);
      const accessCookie = await this.generateAccessCookie(assessment._id);
      res.setHeader('Set-Cookie', [assessmentCookie, accessCookie]);

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
        // User passed assessment. Finish.
        cookie = await this.generateAssessmentCookie(assessment, 5, true);
        assessmentDto = this.generateAssessmentDto(null, true);
      } else if (tokenData.attemptNumber === 4) {
        // User failed assessment. Finish.
        cookie = await this.generateAssessmentCookie(assessment, 5, false);
        assessmentDto = this.generateAssessmentDto(null, false);
        // Clean assessment
        await this.assessmentService.removeById(tokenData.testId);
      } else {
        // User failed assessment Next attempt
        const attemptNumber = tokenData.attemptNumber + 1;
        cookie = await this.generateAssessmentCookie(assessment, attemptNumber);
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

  public async generateAssessmentCookie(assessment: Assessment, attemptNumber = 0, isSuccess = false): Promise<string> {
    const tokenDto = { testId: assessment._id, attemptNumber, isSuccess };
    const tokenData = await this.tokenService.createToken(tokenDto);
    const cookie = await this.tokenService.createAssessmentCookie(tokenData);

    return cookie;
  }

  public async generateAccessCookie(id: string): Promise<string> {
    const tokenData = await this.tokenService.createToken({ id });
    const cookie = await this.tokenService.createAccessCookie(tokenData);

    return cookie;
  }
}

export default AssessmentController;
