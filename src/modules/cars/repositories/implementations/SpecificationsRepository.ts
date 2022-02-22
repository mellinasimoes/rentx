import {Specification} from "../../entities/Specification";
import { ISpecificationsRepository, IcreateSpecificationDTO } from "../ISpecificationRepository";
import {Repository, getRepository} from "typeorm"

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor (){
    this.repository=getRepository(Specification);
  }

  async create({ description, name }: IcreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ 
      description,
      name,
    })

  await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    const specification= await this.repository.find();
    return specification;
  }

  async findByName(name:string): Promise<Specification | undefined> {

    const specification = await this.repository.findOne ({name});
    return specification;
  }

}
export {SpecificationsRepository};