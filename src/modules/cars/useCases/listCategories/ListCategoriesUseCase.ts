import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '@modules/cars/entities/Category';
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