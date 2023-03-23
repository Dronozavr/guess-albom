import albumService from '@/services/album.service';
import bandService from '@/services/band.service';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public albumService = new albumService();
  public bandService = new bandService();

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
  public getAlbums = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bandId: string = req.params.id;
      const band = await this.bandService.findBandById(bandId);
      const albums = await this.albumService.getAlbums(band);
      res.send(albums);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
