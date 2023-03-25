// import { HttpException } from '@exceptions/HttpException';
import { Album } from '@/interfaces/album.interface';
import { Band } from '@/interfaces/band.interface';
import { Assessment } from '@/interfaces/assessment.interface';
import assessmentModel from '@/models/assessment.model';
import mongoose from 'mongoose';

class AssessmentService {
  public assessment = assessmentModel;

  public async createAssessment(band: Band, albums: Album[]): Promise<Assessment> {
    const assessment: Assessment = await this.assessment.create({
      _id: new mongoose.Types.ObjectId(),
      bandId: band._id,
      albums: albums.map(({ _id, name }) => ({ _id, name })),
    });

    return assessment;
  }

  public async findById(id: string): Promise<Assessment> {
    const assessment: Assessment = await this.assessment.findById(id);

    return assessment;
  }

  public async removeById(id: string): Promise<Assessment> {
    const assessment: Assessment = await this.assessment.findOneAndRemove({ _id: id });

    return assessment;
  }
}

export default AssessmentService;
