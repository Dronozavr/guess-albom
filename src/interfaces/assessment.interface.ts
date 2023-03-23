import { Album } from './album.interface';

export interface Assessment {
  id: string;
  bandId: string;
  albums: Album[];
}
