import bandModel from '@models/band.model';
import { Band } from '@/interfaces/band.interface';

class BandService {
  public bands = bandModel;

  public async findAllBands(): Promise<Band[]> {
    const bands: Band[] = await this.bands.find();
    return bands;
  }

  public async findBandById(id: string): Promise<Band> {
    const band: Band = await this.bands.findOne({ _id: id });

    return band;
  }
}

export default BandService;
