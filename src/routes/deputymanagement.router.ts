import DeputyManagementController from '../controllers/deputymanagement.controller';
import { Router } from "express";

const DeputymanagementRouter = Router()
const DeputymanagementController = new DeputyManagementController()

DeputymanagementRouter.post('/create', DeputymanagementController.createDeputyManagement.bind(DeputymanagementController))
DeputymanagementRouter.get('/reads', DeputymanagementController.getAllDeputyManagement.bind(DeputymanagementController))
DeputymanagementRouter.get('/read', DeputymanagementController.getDeputyManagementById.bind(DeputymanagementController))
DeputymanagementRouter.post('/update', DeputymanagementController.updateDeputyManagement.bind(DeputymanagementController))
DeputymanagementRouter.post('/delete', DeputymanagementController.deleteDeputyManagement.bind(DeputymanagementController))

export default DeputymanagementRouter;