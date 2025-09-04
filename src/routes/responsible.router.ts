import ResponsibleController from '../controllers/responsible.controller';
import { Router } from "express";

const responsibleRouter = Router()
const responsibleController = new ResponsibleController()

responsibleRouter.post('/create', responsibleController.createResponsible.bind(responsibleController))
responsibleRouter.get('/reads', responsibleController.getAllResponsibles.bind(responsibleController))
responsibleRouter.get('/read', responsibleController.getResponsibleById.bind(responsibleController))
responsibleRouter.post('/update', responsibleController.updateResponsible.bind(responsibleController))
responsibleRouter.post('/delete', responsibleController.deleteResponsible.bind(responsibleController))

export default responsibleRouter;