import { injectable, inject} from "tsyringe";
import {hash} from "bcrypt";

import {IUsersRepository} from "../../repositories/IUsersRepository";
import {ICreateUserDTO} from "../../../dtos/ICreateUserDTO";
import { AppError } from "../../../../database/errors/AppError";
@injectable()
class CreateUserCase{
  constructor(
    @inject("UsersRepository")
    private usersRepository:IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void>{

    const userAlreadyExists=await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError ("User already exists!");
    }

    const passwordHash = await hash(password,8);

    await this.usersRepository.create({
      name,
      email,
      password:passwordHash,
      driver_license
  });
  }
}

export {CreateUserCase};