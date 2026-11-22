import { Schema, model } from 'mongoose';
import {z} from "zod";

export interface IArt {
  name: string;
  genre: string;
  year: number;
  imageUrl?: string;
}
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateArtInput:
 *       type: object
 *       required:
 *         - name
 *         - genre
 *       properties:
 *         name:
 *           type: string
 *           example: WaterInCup
 *         genre:
 *           type: string
 *           example: streetArt
 *         year:
 *           type: integer
 *           example: 2010
 *         imageUrl:
 *           type: string
 *           format: uri
 *           example: https://example.com/images/water-in-cup.jpg
 */


export const createArtZSchema = z.object({
  name: z.string().min(1),
  genre: z.string().min(1),
  year: z.number().min(1950).optional(),
  imageUrl: z.string().url().optional(),
});

export const updateArtZSchema = z.object({
  name: z.string().min(1),
  genre: z.string().min(1),
  year: z.number().min(1950).optional(),
  imageUrl: z.string().url().optional(),
});



const artSchema = new Schema<IArt>(
  {
    name: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, z: z.number().min(1950), required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const ArtModel = model<IArt>('Art', artSchema);
