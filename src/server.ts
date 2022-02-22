import express from 'express';
import swaggerUi from "swagger-ui-express"; 
import "./database";
import "./shared/container"
import {router} from "./routes";
import swaggerFile from "./swagger.json";
import { categoriesRoutes } from './routes/categories.routes';
//se der erro ir no arquivo tsconfig.js e colocar resolveJsonModule:true

const app=express();

app.use(express.json());

// app.use("/categories", categoriesRoutes);
app.use("/api-docs", swaggerUi.serve,swaggerUi.setup(swaggerFile))
//rota que contem a documentação, chama o servidor, 
//setup arquivo json contendo a documentação

app.use (router);

app.listen (3333, () => console.log ("Server is running!!!!"))  