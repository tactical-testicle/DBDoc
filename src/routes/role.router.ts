import RoleController from '../controllers/role.controller';
import { Router } from "express";

const roleRouter = Router()
const roleController = new RoleController()

roleRouter.post('/create', roleController.createRole.bind(roleController))
roleRouter.get('/reads', roleController.getAllRoles.bind(roleController))
roleRouter.get('/read', roleController.getRoleById.bind(roleController))
roleRouter.post('/update', roleController.updateRole.bind(roleController))
roleRouter.post('/delete', roleController.deleteRole.bind(roleController))

export default roleRouter;