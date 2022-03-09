import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken"
import { AppError } from "../../../database/errors/AppError";


interface IRequest{
  email:string;
  password:string;
}

interface IResponse{
  user:{
    name:string,
    email:string,
  };
  token:string
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository  //IUsersRepository tem as funções create e findByEmail
  ){}

  async execute({email,password}: IRequest) {

    const user= await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError ("Email or password incorrect!")
    }

    const passwordMatch= await compare(password, user.password);

    if (!passwordMatch){
      throw new AppError ("Email or password incorrect!");
    }

    const token = sign({},"ebad73c3cb309ac62275e07997da7a09",{//chave secreta gerada pelo MD5
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name:user.name,
        email:user.email,
      },
    };

    return tokenReturn;
  }
}

export {AuthenticateUserUseCase}