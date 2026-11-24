import { Request, Response } from 'express';
import { ArtService } from '../services/arts';
import { createArtZSchema } from '../models/arts';

const artService = new ArtService();


export class ArtController {



  /**
 * @openapi
 * /arts:
 *   get:
 *     summary: Retrieve all arts
 *     tags:
 *       - Arts
 *     responses:
 *       200:
 *         description: Successfully retrieved arts
 *       500:
 *         description: Internal server error
 */

  getAllArts = async (_req: Request, res: Response): Promise<void> => {

    try {

      
      const arts = await artService.getAllArts();
      res.status(200).json(arts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching arts', error });
    }
  };

  
/**
* @openapi
* /arts/{id}:
*   get:
*     summary: Get an art piece by ID
*     tags:
*       - Arts
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Art found
*       404:
*         description: Art not found
*       500:
*         description: Internal server error
*/

  getArtById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const art = await artService.getArtById(id);
      if (!art) {
        res.status(404).json({ message: 'Art not found' });
        return;
      }
      res.status(200).json(art);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching art', error });
    }
  };

    /**
 * @openapi
 * /arts:
 *   post:
 *     summary: Create a new art piece
 *     tags:
 *       - Arts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateArtInput'
 *     responses:
 *       201:
 *         description: Successfully created art
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */


  createArt = async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = createArtZSchema.safeParse(req.body);
  
        console.log ("Validation result:", validation);
  
        if (!validation.success) {
          res.status(400).json({ message: 'Invalid art data', errors: validation.error.issues });
          return;
        }
        
      const newArt = await artService.AddArt(req.body);
      res.status(201).json(newArt);
    } catch (error) {
      res.status(500).json({ message: 'Error inserting into MongoDB', error });
    }
  };

  
/**
* @openapi
* /arts/{id}:
*   put:
*     summary: Update an art piece by ID
*     tags:
*       - Arts
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CreateArtInput'
*     responses:
*       200:
*         description: Art updated
*       404:
*         description: Art not found
*       500:
*         description: Internal server error
*/

  updateArt = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updatedArt = await artService.updateArt(id, req.body);
      if (!updatedArt) {
        res.status(404).json({ message: 'Art not found' });
        return;
      }
      res.status(200).json(updatedArt);
    } catch (error) {
      res.status(500).json({ message: 'Error updating art', error });
    }
  };

  /**
* @openapi
* /arts/{id}:
*   delete:
*     summary: Delete an art piece by ID
*     tags:
*       - Arts
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Art deleted
*       404:
*         description: Art not found
*       500:
*         description: Internal server error
*/

  deleteArt = async (_req: Request, res: Response): Promise<void> => {
    try {
      const id = Array.isArray(_req.params.id) ? _req.params.id[0] : _req.params.id;
      const deletedArt = await artService.deleteArt(id);
      if (!deletedArt) {
        res.status(404).json({ message: 'Art not found' });
        return;
      }
      res.status(200).json({ success: true, data: deletedArt });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting art', error });
    }
  };

}
