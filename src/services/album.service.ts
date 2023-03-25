// import { HttpException } from '@exceptions/HttpException';
import albumModel from '@models/album.model';
import { Album, ExternalAlbum, ExternalAlbumsResult } from '@/interfaces/album.interface';
import { fetch, parametrizeString } from '@/utils/util';
import { Band } from '@/interfaces/band.interface';
// const crypto = require('crypto');

const getITunesURL = (nameForQuery: string) => `https://itunes.apple.com/search?entity=album&limit=5&term=${nameForQuery}&attribute=artistTerm`;

class AlbumService {
  public albums = albumModel;

  public async findAlbumsByBand(bandId: string): Promise<Album[]> {
    const albums: Album[] = await this.albums.find({ bandId });

    return albums;
  }

  public async saveAlbums(albums: Pick<Album, 'name'>[], bandId: string): Promise<Album[]> {
    const albumsWithBand = albums.map(alb => ({ ...alb, bandId }));
    const albumsToReturn = await this.albums.insertMany(albumsWithBand);

    return albumsToReturn;
  }

  public async getAlbumsFromExternalSource(bandName: string): Promise<ExternalAlbum[]> {
    const nameForQuery = parametrizeString(bandName);

    const fetchedAlbums = await fetch<ExternalAlbumsResult>(getITunesURL(nameForQuery));

    return fetchedAlbums.results;
  }

  public convertAlbums(externalAlbums: ExternalAlbum[]): Pick<Album, 'name'>[] {
    return externalAlbums.map(ea => ({ name: ea.collectionName }));
  }

  // TODO: Band shoud be avoided due to coupling
  public async getAlbums(band: Band): Promise<Album[]> {
    let albums = await this.findAlbumsByBand(band._id);

    if (!albums.length) {
      const externalAlbums = await this.getAlbumsFromExternalSource(band.name);
      albums = await this.saveAlbums(this.convertAlbums(externalAlbums), band._id);
    }

    return albums;
  }
}

export default AlbumService;
