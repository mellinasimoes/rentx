import express, { NextFunction } from 'express';
import {Request,Response} from 'express';
import "express-async-errors";
import swaggerUi from "swagger-ui-express"; 
import "./database";
import "./shared/container"
import {router} from "./routes";
import swaggerFile from "./swagger.json";
import { AppError } from './database/errors/AppError';
//se der erro ir no arquivo tsconfig.js e colocar resolveJsonModule:true

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

app.listen (3333, () => console.log ("Server is running!!!!"))  