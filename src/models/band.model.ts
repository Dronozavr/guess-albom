import { model, Schema, Document } from 'mongoose';
import { Band } from '@interfaces/band.interface';

const bandSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const bandModel = model<Band & Document>('Band', bandSchema);

export default bandModel;
