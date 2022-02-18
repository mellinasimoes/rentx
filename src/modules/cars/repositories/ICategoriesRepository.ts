import { Category } from "../entities/Category";

interface ICreateCategoryDTO{
  name:string;
  description:string;
}

interface ICategoriesRepository{
  findByName (name:string): Promise<Category | undefined>;
  list (): Promise<Category[]|null>;
  create ({name, description}: ICreateCategoryDTO): Promise<void>;
}
export {ICategoriesRepository, ICreateCategoryDTO};