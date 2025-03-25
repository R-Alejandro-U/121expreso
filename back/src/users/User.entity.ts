import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../comments/Comment.entity";
import { typeorm } from "../configs/database.config";
import { Min } from "class-validator";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column({type: 'varchar', length: 100, nullable: false})
    @Min(4, {message: 'El mínimo es de 4 caracteres'})
    name!: string;
    @Column({type: 'varchar', nullable: false, unique: true})
    email!: string;
    @Column({type: 'text', nullable: false})
    password!: string;
    @CreateDateColumn()
    CreateAcount?: Date;
    @OneToMany(() => Comment, (comment) => comment.user, {nullable: true})
    comments?: Comment;
};
export const userModel = typeorm.getRepository(User);
