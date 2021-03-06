import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlerwares/ensureAuthenticated";
import { ensureAdmin } from "../middlerwares/ensureAdmin";


// import { importCategoryController } from "../modules/cars/useCases/importCategory";

const categoriesRoutes = Router(); 

//armazena em uma pasta temporária
const upload = multer({
  dest:"./tmp"
});

const createCategoryController= new CreateCategoryController();
const importCategoryController= new ImportCategoryController();
const listCategoriesController= new ListCategoriesController();

categoriesRoutes.post ("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get ("/", listCategoriesController.handle);

categoriesRoutes.post("/import", upload.single("file"),importCategoryController.handle);

export { categoriesRoutes };
