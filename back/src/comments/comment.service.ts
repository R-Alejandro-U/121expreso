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
    getAllComments: async (limit: number): Promise<GetCommentsResponse> => {
        try {
            const comments : Comment[] = await commentModel.createQueryBuilder('comment')
            .orderBy('RAND()')
            .limit(limit)
            .leftJoinAndSelect('comment.user', 'user')
            .getMany();
            const partialComments: CommentDTO[] = comments.map((comment: Comment): CommentDTO => {
                const { UpDateComment, user, ...partialComment } = comment;
                const { name } = user;
                return { ...partialComment, user: name };
            });
            return {
                comments: partialComments,
            };
        } catch (error) {
            throw error;
        }
    },
    deleteComment: async (id: string): Promise<string> => {
        try {
            const comment: Comment | null = await commentModel.findOneBy({ id });
            if (!comment) throw new Error('No se encontró el mensaje.');
            await commentModel.remove(comment);
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