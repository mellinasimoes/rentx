import {parse as csvParse} from "csv-parse"; //import {parse as csvParse} from "csv-parse";
import fs from "fs"; // lib File System
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { injectable, inject } from "tsyringe";

//fs modulo nativo do node (file system) executa funções

interface IImportCategory{
  name:string;
  description:string;
}
@injectable()
class ImportCategoryUseCase {
  constructor (
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository){}

 loadCategories(file:Express.Multer.File): Promise<IImportCategory[]>{
   // Estou definindo que o retorno será uma Promise, por isso temos
     // resolve para retornar em caso de sucesso e
     // reject para retornar em caso de falha
  return new Promise ((resolve, reject)=>{
    const stream = fs.createReadStream(file.path); // Cria um stream de leitura. Permite fazer a leitura do arquivo em partes
    const categories:IImportCategory[]=[];

    // permite separar os registro de cada linha do arquivo buscando um delimitador (o => no caso do nosso arquivo)
    const parseFile = csvParse({
      delimiter: '=>',
      trim: true
    }); 

    stream.pipe (parseFile);
    //pipe pega a informação lida no stream e transfere para outro lugar pré determinado
    //vai transferir a informação para a biblioteca csv-parse
    
    parseFile.on("data", async (line)=>{
      const [name,description]=line;
      categories.push({
        name,
        description,
      });
    })
    .on("end", ()=>{
      fs.promises.unlink(file.path)
      resolve(categories);
    })
    .on("error", (err)=>{
      reject(err);
    })
  });

  }
  
  async execute (file: Express.Multer.File): Promise<void> {
    const categories= await this.loadCategories(file);

    categories.map(async (category)=>{
      const{name,description}= category;

      const existCategory= await this.categoriesRepository.findByName(name);

      if (!existCategory){
        await this.categoriesRepository.create({
          name,
          description,
        });
      }

    });
   
  }
}

export {ImportCategoryUseCase};

// instalar biblioteca yarn add csv-parse