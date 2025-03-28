import { Min } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../users/User.entity";

@Entity({name: "comments"})
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column({type: 'varchar', length: 500, nullable: false})
    @Min(4, {message: 'El mínimo es de 4 caracteres'})
    comment!: string;
    @CreateDateColumn()
    CreateComment?: Date;
    @UpdateDateColumn()
    UpDateComment?: Date;
    @ManyToOne(() => User, (user) => user.comments, {cascade: false})
    user!: User;
};
