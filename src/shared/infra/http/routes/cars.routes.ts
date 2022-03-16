import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlerwares/ensureAdmin";
import { ensureAuthenticated } from "../middlerwares/ensureAuthenticated";


const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController= new ListAvailableCarsController();


carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle); // checa se o usuário está logado e se é admin
carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
