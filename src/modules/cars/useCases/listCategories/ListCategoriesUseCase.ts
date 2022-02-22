import {ICategoriesRepository} from '../../repositories/ICategoriesRepository';
import { Category } from '../../entities/Category';
import { injectable, inject } from 'tsyringe';

@injectable()
class ListCategoriesUseCase{
  constructor (
    @inject("CategoriesRepository") 
    private categoriesRepository: ICategoriesRepository){}

  async execute(): Promise <Category[] |null> {
    const categories = await this.categoriesRepository.list();
   
      
    return categories;
  }
}

export {ListCategoriesUseCase}