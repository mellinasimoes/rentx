import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

//se der erro ir no arquivo tsconfig.js e colocar resolveJsonModule:true
createConnection();

const app=express();

app.use(express.json());

// app.use("/categories", categoriesRoutes);
app.use("/api-docs", swaggerUi.serve,swaggerUi.setup(swaggerFile))
//rota que contem a documentação, chama o servidor, 
//setup arquivo json contendo a documentação

app.use (router);

app.use((err: Error, request:Request, response:Response,next:NextFunction)=>{
  if(err instanceof AppError){ //Verifica se o erro é do tipo AppError
    return response.status(err.statusCode).json({
      message:err.message
    })
  }
  return response.status(500).json({
    status:"error",
    message:`Internal server erro - ${err.message}`, //Concatenação usa crase pra abrir e pra fechar
  });
})

export { app }