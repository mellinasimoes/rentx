import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface Irequest{
  name:string;
  description:string;
}

/**
 * Reponsável por chamar(executar) a manipulação dos dados da entidade Repository
 */
class CreateCategoryUseCase {
  constructor (private categoriesRepository: ICategoriesRepository){}

    execute({description, name}: Irequest): void {
      const categoryAlreadyExists = this.categoriesRepository.findByName(name);

      if (categoryAlreadyExists){
        throw new Error ("Category already exists!")
      }

      this.categoriesRepository.create({name,description});
    }
}
export {CreateCategoryUseCase};
