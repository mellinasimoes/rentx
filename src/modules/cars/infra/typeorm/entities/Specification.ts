import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from "uuid"

@Entity("specification")
class Specification{
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string | undefined;

  @Column()
  description: string | undefined;

  @CreateDateColumn()
  created_at: Date | undefined;

  constructor (id?:string){
    if (!this.id){
      this.id=uuidv4();
    } else {
      this.id=id;
    }
  }
}

export {Specification};