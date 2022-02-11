import {Request,Response} from 'express'

import {ListCategoriesUseCase} from "./ListCategoriesUseCase"

class ListCategoriesController{
  constructor (private listCategorieUseCase:ListCategoriesUseCase) {}

  handle(request:Request,response:Response): Response {
    const all= this.listCategorieUseCase.execute();
    return response.json(all);  
  }
}
export {ListCategoriesController}