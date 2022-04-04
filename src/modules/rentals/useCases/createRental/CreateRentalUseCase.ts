import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { Rental } from "@modules/rentals/infra/typorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";


interface IRequest{
  user_id:string;
  car_id:string;
  expected_return_date:Date;
}
@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository


  ){}
  async execute ({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

  const carUnAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnAvailable) {
      throw new AppError ("Car is not available")
    }

  const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if(rentalOpenToUser){
      throw new AppError ("There's a rental in progress for user!");
    }
  
  const dateNow = this.dateProvider.dateNow();

  console.log("dateNow: ", dateNow);
  console.log("expected_return_date: ", expected_return_date);
  

  const compare  = this.dateProvider.compareInHours(
    dateNow,
    expected_return_date
  );

  console.log(compare);
  console.log(minimumHour);
  

  if(compare<minimumHour){
    throw new AppError ("Invalid return time!");
  }
  
  const rental = await this.rentalsRepository.create({
    user_id,
    car_id,
    expected_return_date,
  });

  await this.carsRepository.updateAvailable(car_id,false);

  return rental;
  }
}  

export { CreateRentalUseCase };
