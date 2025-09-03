import Cat_typedocumentController from '../controllers/cat_typedocument.controller';
import { Router } from "express";

const cat_typedocumentRouter = Router()
const cat_typedocumentController = new Cat_typedocumentController()

cat_typedocumentRouter.post('/create', cat_typedocumentController.createCat_typedocument.bind(cat_typedocumentController))
cat_typedocumentRouter.get('/reads', cat_typedocumentController.getAllCat_typedocuments.bind(cat_typedocumentController))
cat_typedocumentRouter.get('/read', cat_typedocumentController.getCat_typedocumentById.bind(cat_typedocumentController))
cat_typedocumentRouter.post('/update', cat_typedocumentController.updateCat_typedocument.bind(cat_typedocumentController))
cat_typedocumentRouter.post('/delete', cat_typedocumentController.deleteCat_typedocument.bind(cat_typedocumentController))

export default cat_typedocumentRouter;