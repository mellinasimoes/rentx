import {Request,Response} from 'express'
import {ListCategoriesUseCase} from "./ListCategoriesUseCase"
import {container} from "tsyringe"

class ListCategoriesController{
  async handle(request:Request,response:Response): Promise<Response> {
    const listCategorieUseCase = container.resolve(ListCategoriesUseCase);

    const all = await listCategorieUseCase.execute();

    return response.json(all);  
  }
}
export {ListCategoriesController}