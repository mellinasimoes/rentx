import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uloadCarImages/UploadCarImagesController";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlerwares/ensureAdmin";
import { ensureAuthenticated } from "../middlerwares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController= new ListAvailableCarsController();
const createCarSpecificationController= new CreateCarSpecificationController();
const uploadCarImagesController= new UploadCarImagesController();

const upload= multer(uploadConfig);

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle); // checa se o usuário está logado e se é admin
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin,createCarSpecificationController.handle);
carsRoutes.post("/images/:id",ensureAuthenticated, ensureAdmin,upload.array("images"), uploadCarImagesController.handle);



export { carsRoutes };
