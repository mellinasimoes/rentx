import {ICategoriesRepository} from '../../repositories/ICategoriesRepository';
import { Category } from '../../model/category';

class ListCategoriesUseCase{

  constructor (private categoriesRepository: ICategoriesRepository){}

  execute(): Category[] |null {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export {ListCategoriesUseCase}