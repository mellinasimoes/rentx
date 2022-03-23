import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository{
  
  cars: Car[] = [];

  async create({
    name, 
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name, 
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      id,
    });

    this.cars.push(car);

    return car;

  }
  
  async findByLicensePlate(license_plate: string): Promise<Car> {
 
    return this.cars.find((car) => car.license_plate === license_plate); // find retorna apenas um
  }
  async findAvailable(
    category_id?:string, 
    brand?:string,
    name?:string
  ): Promise<Car[]> {
    const all = this.cars.filter((car) => {    // filter retorna uma lista
      if (car.available === true ||  // se o carro estiver disponível E
          (brand && car.brand === brand) || // a marca informada for igual a marca do carro OU
          (category_id && car.category_id === category_id) ||  // a categoria informada for igual a categoria do carro OU
          (name && car.name === name) // o nome informado  for igual ao nome do carro
      ) { 
          return car;
        }
        return null;
    });
    
    return all;
  }
  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}
export { CarsRepositoryInMemory };
