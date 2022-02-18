import {Request,Response} from 'express'
import {ListCategoriesUseCase} from "./ListCategoriesUseCase"

class ListCategoriesController{
  constructor (private listCategorieUseCase:ListCategoriesUseCase) {}

  async handle(request:Request,response:Response): Promise<Response> {
    const all = await this.listCategorieUseCase.execute();

    return response.json(all);  
  }
}
export {ListCategoriesController}