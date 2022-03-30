import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { injectable, inject } from "tsyringe";
import { Rental } from "@modules/rentals/infra/typorm/entities/Rental";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute (user_id: string): Promise<Rental[]>{
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}

export {ListRentalsByUserUseCase}