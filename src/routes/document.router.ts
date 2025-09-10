import { Router } from "express";
import { DocumentController } from "../controllers/document.controller";

const documentRouter = Router();

documentRouter.post("/create", DocumentController.create);
documentRouter.get("/reads", DocumentController.findAll);
documentRouter.get("/:uuid", DocumentController.findById);
documentRouter.put("/:uuid", DocumentController.update);
documentRouter.delete("/:uuid", DocumentController.delete);

export default documentRouter;