import {Specification} from "../entities/Specification"

interface IcreateSpecificationDTO{
  name:string;
  description:string;
}

interface ISpecificationsRepository {
  findByName (name:string): Promise<Specification|undefined>;
  list (): Promise<Specification[]|null>;
  create ({description,name}: IcreateSpecificationDTO):Promise<void>;
}
export {ISpecificationsRepository, IcreateSpecificationDTO};