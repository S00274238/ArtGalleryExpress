import { ArtModel, IArt } from '../models/arts';
import { HydratedDocument } from 'mongoose';

export class ArtService {



  async getAllArts(): Promise<IArt[]> {
    console.log("Fetching all arts from the database...");
    return await ArtModel.find().lean(); 
  }

  async getArtById(id: string): Promise<IArt | null> {
    return await ArtModel.findById(id).lean();
  }

  async AddArt(artData: IArt): Promise<HydratedDocument<IArt>> {
    const art = new ArtModel(artData);
    return await art.save();
  }
  
  async createUser(userData: IArt): Promise<HydratedDocument<IArt>> {
    const user = new ArtModel(userData);
    return await user.save();
  }

  async updateArt(id: string, artData: Partial<IArt>): Promise<IArt | null> {
    return await ArtModel.findByIdAndUpdate(id, artData, { returnDocument: 'after' }).lean();
  }

  async deleteArt(id: string): Promise<IArt | null> {
    return await ArtModel.findByIdAndDelete(id).lean();
  }

}
