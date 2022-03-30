import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";
import { Rental } from "../infra/typorm/entities/Rental";


interface IRentalsRepository{
  create({car_id,user_id,expected_return_date}): Promise<Rental>;
  findOpenRentalByCar (car_id:string): Promise<Rental>;
  findOpenRentalByUser (user_id:string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
