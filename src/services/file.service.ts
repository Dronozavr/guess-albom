import bandModel from '@models/band.model';
import fs from 'fs';
import { User } from '@/interfaces/users.interface';
import { Album } from '@/interfaces/album.interface';
import { promisify } from 'util';

class FileService {
  public bands = bandModel;

  public async recordAlbums(albums: Album[], bandName: string): Promise<any> {
    // const header = '\n New albums \n';
    const data = `\n ${bandName} \n` + albums.map((usr, i) => `${i + 1}. ${usr.name}; \n`).join('');
    const result = await promisify(fs.writeFile)('./albums.txt', data, { flag: 'a' });

    return result;
  }

  public async recortTopList(leaders: User[]): Promise<any> {
    const data = '\n Leaders Board \n' + leaders.map((usr, i) => `${i + 1}. ${usr.name} - ${usr.points}; \n`).join('');
    const result = await fs.writeFile('./leader-board.txt', data, err => {
      if (err) {
        throw new Error();
      }

      return;
    });

    return result;
  }
}

export default FileService;
