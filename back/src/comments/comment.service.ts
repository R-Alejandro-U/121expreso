/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { commentModel } from "../configs/database.config"
import { UserDTO } from "../users/User.DTO";
import { userService } from "../users/user.service";
import { CommentDTO, GetCommentsResponse, IPerspectiveResponse, NewCommentDTO } from "./comment.dto";
import { Comment } from "./Comment.entity"
import { API_KEY } from "../configs/envs.config";

export const commentService = {
    getAllComments: async (page: number, limit: number): Promise<GetCommentsResponse> => {
        try {
            const [comments, total_items] : [Comment[], number] = await commentModel.findAndCount({ 
                relations: ["user"], 
                skip: (page -1) * limit,
                take: limit
            });
            if(!comments.length && total_items === 0) throw new Error('Sin comentarios en la base de datos.');
            const max_pages: number = Math.ceil(total_items / limit) || 1;
            const partialComments: CommentDTO[] = comments.map((comment: Comment): CommentDTO => {
                const { UpDateComment, user, ...partialComment } = comment;
                const { name } = user;
                return { ...partialComment, user: name };
            });
            return {
                comments: partialComments,
                pagination_info: {
                    current_items: partialComments.length,
                    max_pages,
                    page,
                    total_items
                },
            };
        } catch (error) {
            throw error;
        }
    },
    deleteComment: async (id: string): Promise<string> => {
        try {
            const comment: Comment | null = await commentModel.findOneBy({ id });
            if (!comment) throw new Error('No se encontró el mensaje.');
            await commentModel.delete(comment);
            return 'Se eliminó el comentario exitosamente.';
        } catch (error) {
            throw error;
        }
    },
    newComment: async (userId: string, { comment }: NewCommentDTO): Promise<string> => {
        try {
            const user: UserDTO = await userService.getUserById(userId);
            const { data } = await axios.post<IPerspectiveResponse>(API_KEY, {
                comment: { text: comment },
                languages: ['es', 'en'],
                requestedAttributes: { TOXICITY: {} },
            });
            if (data.attributeScores.TOXICITY.summaryScore.value >= 0.4) throw new Error('Este comentario es muy ofensivo y no será guardado.');
            await commentModel.save({ comment, user });
            return `Se ha guardado con éxito el comentario. Gracias por participar ${user.name}.`;
        } catch (error) {
            throw error;
        }
    },
}