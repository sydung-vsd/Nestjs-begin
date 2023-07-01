import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_auth')
export class UserAuthEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true}) // để định nghĩa một file là suy nhất
    username: string;

    @Column()
    password: string;
}
