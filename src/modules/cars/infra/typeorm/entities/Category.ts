import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string | undefined;

  @Column()
  description: string | undefined;

  @CreateDateColumn()
  created_at: Date | undefined;

  constructor(id?: string) {
    if (!this.id) {
      this.id = uuidV4();    
    } else {
      this.id = id;
    }
  }
}

export { Category };