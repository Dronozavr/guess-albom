import { model, Schema, Document } from 'mongoose';
import { Album } from '@interfaces/album.interface';

const albumSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  bandId: {
    type: Schema.Types.ObjectId,
    ref: 'Band',
    require: true,
  },
});

const albumModel = model<Album & Document>('Album', albumSchema);

export default albumModel;
