import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlerwares/ensureAuthenticated';
import { ensureAdmin } from '../middlerwares/ensureAdmin';



const specificationsRoutes = Router ();

const createSpecificationController=new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes };






