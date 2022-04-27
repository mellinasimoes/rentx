import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

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

  const [, token]= authHeader.split(" ") // Separa a primeira e segunda parte por espaço

try{
  const {sub: user_id}=verify(
    token,                                //vamos receber o refresh_token
    auth.secret_token
    ) as Ipayload;

  request.user={
    id:user_id
  };

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