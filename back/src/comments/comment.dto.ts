import { IsNotEmpty, IsString, Length } from "class-validator";

export class CommentDTO {
    id?: string; 
    user?: string; 
    content?: string; 
    CreateComment?: Date;
}

export class GetCommentsResponse {
    comments!: CommentDTO[];
}

export class NewCommentDTO {
    @IsNotEmpty({message: 'No puede estar vacio el comentario.'})
    @IsString({message: 'Debe ser una cadena de texto.'})
    @Length(4, 500, {message: 'El minimo de caracteres es de 4 y unmaximode 500.'})
    comment!: string;
}

export interface IPerspectiveResponse {
    attributeScores: {
        TOXICITY: {
            summaryScore: {
                value: number;
            };
        };
    };
}