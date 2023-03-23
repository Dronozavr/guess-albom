import { model, Schema, Document } from 'mongoose';
import { Assessment } from '@interfaces/assessment.interface';

const assessmentSchema: Schema = new Schema({
  _id: {
    type: String,
    unique: true,
  },
  bandId: {
    type: String,
    require: true,
  },
  albums: {
    type: Array,
    require: true,
  },
});

const assessmentModel = model<Assessment & Document>('Assessment', assessmentSchema);

export default assessmentModel;
