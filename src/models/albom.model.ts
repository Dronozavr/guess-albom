import { model, Schema, Document } from 'mongoose';
import { Albom } from '@interfaces/albom.interface';

const albomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  artistId: {
    type: String,
  },
});

const albomModel = model<Albom & Document>('Band', albomSchema);

export default albomModel;
