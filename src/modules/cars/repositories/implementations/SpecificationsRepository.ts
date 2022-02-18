import { ISpecificationsRepository, IcreateSpecificationDTO } from "../ISpecificationRepository";
import {Specification} from "../../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor (){
    this.specifications=[];
  }
  create({ description, name }: IcreateSpecificationDTO): void {
    const specification = new Specification ();

    Object.assign (specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }
  findByName (name:string): Specification| undefined {
    const specification = this.specifications.find (
      (specification) => {specification.name === name}
    );
    return specification;
  }
}
export {SpecificationsRepository};