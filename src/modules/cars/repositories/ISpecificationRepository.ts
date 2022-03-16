import { Specification } from "../infra/typeorm/entities/Specification";


interface IcreateSpecificationDTO{
  name:string;
  description:string;
}

interface ISpecificationsRepository {
  create ({description,name}: IcreateSpecificationDTO):Promise<Specification>;
  findByName (name:string): Promise<Specification|undefined>;
  findById(ids:string[]): Promise<Specification[]>;
  list (): Promise<Specification[]|null>;

}
export {ISpecificationsRepository, IcreateSpecificationDTO};