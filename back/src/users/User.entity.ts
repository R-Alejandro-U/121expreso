import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Min } from "class-validator";
import { Comment } from "../comments/Comment.entity";

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
    @Column({type: 'boolean', default: false})
    isAdmin!: boolean;
    @Column({type: 'boolean', default: false})
    isDeleted!: boolean;
    @CreateDateColumn()
    CreateAcount?: Date;
    @OneToMany(() => Comment, (comment) => comment.user, {nullable: true})
    comments?: Comment;
};
