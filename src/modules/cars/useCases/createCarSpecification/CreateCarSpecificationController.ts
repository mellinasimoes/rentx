import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle (request:Request, response:Response): Promise<Response>{
    const {id} = request.params;   // id do carro
    const {specifications_id} = request.body;  //id da especificação
    
    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase
      );
      
    const cars = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(cars);
  }
}

export { CreateCarSpecificationController };
