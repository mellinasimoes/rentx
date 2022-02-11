import express from 'express';
import {categoriesRoutes} from "./routes/categories.routes";
import { specificationsRoutes } from './routes/specifications.routes';

const app=express();
app.use(express.json());

/** 
 * Indica ao server que temos rotas que podem 
 * ser executadas
 * Obs: Cada entidade terá um arquivo de rotas separado
 */
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.listen (3333, () => console.log ("Server is running!!!!"))  