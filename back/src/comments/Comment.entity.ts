import { Min } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { typeorm } from "../configs/database.config";
import { User } from "../users/User.entity";

@Entity({name: "comments"})
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column({type: 'text', length: 500, nullable: false})
    @Min(4, {message: 'El mínimo es de 4 caracteres'})
    content!: string;
    @CreateDateColumn()
    CreateComment?: Date;
    @UpdateDateColumn()
    UpDateComment?: Date;
    @ManyToOne(() => User, (user) => user.comments)
    user!: User;
};

export const userModel = typeorm.getRepository(Comment);
