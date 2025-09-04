import Cat_responseController from '../controllers/cat_response.controller';
import { Router } from "express";

const cat_responseRouter = Router()
const cat_responseController = new Cat_responseController()

cat_responseRouter.post('/create', cat_responseController.createCat_response.bind(cat_responseController))
cat_responseRouter.get('/reads', cat_responseController.getAllCat_responses.bind(cat_responseController))
cat_responseRouter.get('/read', cat_responseController.getCat_responseById.bind(cat_responseController))
cat_responseRouter.post('/update', cat_responseController.updateCat_response.bind(cat_responseController))
cat_responseRouter.post('/delete', cat_responseController.deleteCat_response.bind(cat_responseController))

export default cat_responseRouter;