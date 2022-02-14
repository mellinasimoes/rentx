import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory/index";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/import Category";

const categoriesRoutes = Router(); 

//armazena em uma pasta temporária
const upload = multer({
  dest:"./tmp"
});

categoriesRoutes.post ("/", (request, response)=>{
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get ("/", (request,response)=>{
  return listCategoriesController.handle(request, response);

});

categoriesRoutes.post("/import", upload.single("file"),(request,response)=>{
  return importCategoryController.handle(request, response);

});

export { categoriesRoutes };
