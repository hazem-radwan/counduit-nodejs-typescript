import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn({ type: "text" })
  email: string;
  @Column({ type: "text", unique: true, nullable: false })
  username: string;
  @Column({
    type: "text",
    nullable: false,
  })
  password: string;
  @Column({
    type: "text",
    nullable: true,
  })
  bio?: string;
  @Column({ type: "text", nullable: true })
  image?: string;
}

/*
{
    user : {
        token  : jwt_token , // TODO : implemented by JWT 
    }
}
*/
