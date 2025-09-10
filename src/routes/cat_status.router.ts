import Cat_statusController from '../controllers/cat_status.controller';
import { Router } from "express";

const cat_statusRouter = Router()
const cat_statusController = new Cat_statusController()

cat_statusRouter.post('/create', cat_statusController.createCat_status.bind(cat_statusController))
cat_statusRouter.get('/reads', cat_statusController.getAllCat_statuss.bind(cat_statusController))
cat_statusRouter.get('/read', cat_statusController.getCat_statusById.bind(cat_statusController))
cat_statusRouter.post('/update', cat_statusController.updateCat_status.bind(cat_statusController))
cat_statusRouter.post('/delete', cat_statusController.deleteCat_status.bind(cat_statusController))

export default cat_statusRouter;