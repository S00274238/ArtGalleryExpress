import { Schema, model } from 'mongoose';
import {z} from "zod";

export interface IArt {
  name: string;
  genre: string;
  year: number;
}
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCarInput:
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
 */


export const createArtZSchema = z.object({
  name: z.string().min(1),
  genre: z.string().min(1),
  year: z.number().min(1950).optional(),
});

export const updateArtZSchema = z.object({
  name: z.string().min(1),
  genre: z.string().min(1),
  year: z.number().min(1950).optional(),
});



const artSchema = new Schema<IArt>(
  {
    name: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, z: z.number().min(1950), required: true },
  },
  { timestamps: true }
);

export const ArtModel = model<IArt>('Art', artSchema);
