import { Album } from './album.interface';

export interface Assessment {
  _id: string;
  bandId: string;
  albums: Album[];
}
