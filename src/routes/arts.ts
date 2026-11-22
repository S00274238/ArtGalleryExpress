import {Router} from "express";
import { ArtController } from "../controllers/arts";

const artRoutes = Router();
const artController = new ArtController();

artRoutes.post("/", artController.createArt);
artRoutes.get("/", artController.getAllArts);
artRoutes.get("/:id", artController.getArtById);
artRoutes.put("/:id", artController.updateArt);
artRoutes.delete("/:id", artController.deleteArt);

export default artRoutes;