import { getRepository, Repository } from "typeorm";
import { IcreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationRepository";
import { Specification } from "../entities/Specification";
import { Car } from "../entities/Car";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor (){
    this.repository=getRepository(Specification);
  }

  async create({ description, name }: IcreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ 
      description,
      name,
    })
  await this.repository.save(specification);
  return specification;
  }

  async list(): Promise<Specification[]> {
    const specification= await this.repository.find();
    return specification;
  }

  async findByName(name:string): Promise<Specification | undefined> {

    const specification = await this.repository.findOne ({name});
    return specification;
  }

  async findById(id: string): Promise<Specification> {
    const specification = await this.repository.findOne ({id});
    return specification;
  }
 
}
export { SpecificationsRepository };
