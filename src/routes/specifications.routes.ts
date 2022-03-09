import {Router, Request, Response} from 'express';
import { ensureAuthenticated } from '../middlerwares/ensureAuthenticated';
import  {CreateSpecificationController}  from '../modules/cars/useCases/createSpecification/CreateSpecificationController';


const specificationsRoutes = Router ();

const createSpecificationController=new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export {specificationsRoutes};






