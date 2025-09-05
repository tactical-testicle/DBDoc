import AreaController from '../controllers/area.controller';
import { Router } from "express";

const AreaRouter = Router()
const areaController = new AreaController()

AreaRouter.post('/create', areaController.createArea.bind(AreaController))
AreaRouter.get('/reads', areaController.getAllArea.bind(AreaController))
AreaRouter.get('/read', areaController.getAreaById.bind(AreaController))
AreaRouter.post('/update', areaController.updateArea.bind(AreaController))
AreaRouter.post('/delete', areaController.deleteArea.bind(AreaController))

export default AreaRouter;