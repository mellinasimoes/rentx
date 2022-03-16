import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe ("Create Category", () => {
  beforeEach(() =>{    // Antes de algum teste vai fazer alguma coisa
   categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
   createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  
  });

  it ("Should be able to create a new category", async () =>{  //it é o que se espera
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    
    expect (categoryCreated).toHaveProperty("id");
  });

  it ("Should not be able to create a new category with same name", async () =>{  //it é o que se espera
   expect (async()  => {
      const category = {
        name: "Category Test",
        description: "Category description Test",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});


//Não vamos testar acesso ao banco de dados, 
//Usaremos repositórios "fakes" chamados de repository in-memory
//Vamos usar as interfaces