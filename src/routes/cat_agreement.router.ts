import Cat_agreementController from '../controllers/cat_agreement.controller';
import { Router } from "express";

const cat_agreementRouter = Router()
const cat_agreementController = new Cat_agreementController()

cat_agreementRouter.post('/create', cat_agreementController.createCat_agreement.bind(cat_agreementController))
cat_agreementRouter.get('/reads', cat_agreementController.getAllCat_agreements.bind(cat_agreementController))
cat_agreementRouter.get('/read', cat_agreementController.getCat_agreementById.bind(cat_agreementController))
cat_agreementRouter.post('/update', cat_agreementController.updateCat_agreement.bind(cat_agreementController))
cat_agreementRouter.post('/delete', cat_agreementController.deleteCat_agreement.bind(cat_agreementController))

export default cat_agreementRouter;