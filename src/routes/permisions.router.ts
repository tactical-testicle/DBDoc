import PermisionsController from '../controllers/permisions.controller';
import { Router } from "express";

const permisionsRouter = Router()
const permisionsController = new PermisionsController()

permisionsRouter.post('/create', permisionsController.createPermisions.bind(permisionsController))
permisionsRouter.get('/reads', permisionsController.getAllPermisionss.bind(permisionsController))
permisionsRouter.get('/read', permisionsController.getPermisionsById.bind(permisionsController))
permisionsRouter.post('/update', permisionsController.updatePermisions.bind(permisionsController))
permisionsRouter.post('/delete', permisionsController.deletePermisions.bind(permisionsController))

export default permisionsRouter;