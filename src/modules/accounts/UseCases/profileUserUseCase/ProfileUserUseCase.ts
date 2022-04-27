import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import { IUserResponseDTO } from "@modules/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";


@injectable()
class ProfileUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id:string): Promise<IUserResponseDTO>{
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase }