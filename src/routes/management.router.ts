import ManagementController from '../controllers/management.controller';
import { Router } from "express";

const managementRouter = Router()
const managementController = new ManagementController()

managementRouter.post('/create', managementController.createManagement.bind(managementController))
managementRouter.get('/reads', managementController.getAllManagements.bind(managementController))
managementRouter.get('/read', managementController.getManagementById.bind(managementController))
managementRouter.post('/update', managementController.updateManagement.bind(managementController))
managementRouter.post('/delete', managementController.deleteManagement.bind(managementController))

export default managementRouter;