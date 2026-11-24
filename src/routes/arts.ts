import { Router } from "express";
import { ArtController } from "../controllers/arts";
import { validate } from "../middleware/validation.middleware"
import { createArtZSchema, updateArtZSchema } from "../models/arts"
import { myLogger } from "../middleware/logger.middleware";
import { validateRealImage } from "../middleware/realImage.middleware";



const artRoutes = Router();
const artController = new ArtController();

artRoutes.post("/", validate(createArtZSchema), myLogger, validateRealImage, artController.createArt);
artRoutes.get("/", myLogger, artController.getAllArts);
artRoutes.get("/:id", myLogger, artController.getArtById);
artRoutes.put("/:id", validate(updateArtZSchema), myLogger, artController.updateArt);
artRoutes.delete("/:id", myLogger, artController.deleteArt);

export default artRoutes;