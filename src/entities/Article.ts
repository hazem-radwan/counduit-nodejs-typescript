import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Article {
  @PrimaryColumn({
    type: "text",
  })
  slug: string;

  @Column({
    length: 40,
  })
  title: string;
  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;
  @Column({
    type: "text",
  })
  body: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  udatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  author: User;
}
/*
   {
       article { 
           tageList  :  ["dragons" , "trainning"] ,  / TODO : relationship with tages
           favorited  : false , // TODO  : relationship with user 
           favoritesCount : 8 , 
       }
   }
  
  */
