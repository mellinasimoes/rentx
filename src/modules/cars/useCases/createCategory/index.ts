import {CreateCategoryController} from "./CreateCategoryController";
import {CreateCategoryUseCase} from "./CreateCategoryUseCase";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

console.log("arquivo category");

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase (categoriesRepository);
  const createCategoryController = new CreateCategoryController (createCategoryUseCase);

  return createCategoryController;
};  