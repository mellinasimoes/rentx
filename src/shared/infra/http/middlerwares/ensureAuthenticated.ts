import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";



interface Ipayload{
  sub:string; //sub é o id do usuário
}

export async function ensureAuthenticated(
  request:Request,
  response:Response,
  next:NextFunction
  ){

  const authHeader=request.headers.authorization; //vem lá do insomnia por headers

  if (!authHeader){
    throw new AppError ("Token missing", 401)
  }

  const [,token]= authHeader.split(" ") // Separa a primeira e segunda parte por espaço

try{
  const {sub: user_id}=verify(
    token,
    "ebad73c3cb309ac62275e07997da7a09"
    ) as Ipayload;

  const usersRepository= new UsersRepository();
  const user = await usersRepository.findById(user_id)

  if (!user) {
    throw new AppError ("User does not exists!", 401);
  }

  request.user={
    id:user_id
  }

  next();
} catch{
  throw new AppError ("Invalid token!",401)
}
//Authorization vem em duas partes e só queremos a segunda (token), entao usar 
//a função split
//For pensar no array, a primeira parte (Bearer) está na posição zero e 
//a segunda parte (Token) está na posição 1 e será colocado na variável token

//Usar a função verify e a chave secreta usada no AuthenticateUserUseCase.ts

//Se der sucesso continua no try, se der erro vai para o catch




}