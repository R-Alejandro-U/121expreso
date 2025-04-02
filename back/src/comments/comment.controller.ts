/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express'
import { commentService } from './comment.service';
import { IAccess } from '../utils/globalDTOs/access.dto';
import { NewCommentDTO } from './comment.dto';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export const commentController = {
    getAllComments: async (req: Request, res: Response) => {
        try {
            let page: any = req.query['page'];
            let limit: any = req.query['limit'];
            if (!page || isNaN(parseInt(page, 10))) page = 1;
            if (!limit || isNaN(parseInt(limit, 10))) limit = 3;
            res.status(200).json({ data: await commentService.getAllComments(+page, +limit)});
        } catch (error) {
            const err: string = error instanceof Error ? error.message : 'Error desconocido.'
            res.status(404).json({ error: 'Sin información', message: err });
        };
    },
    deleteComment: async (req: Request, res: Response) => {
        try {
            const validateUUID: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
            const id: string | undefined = req.params['id'];
            if (!id) {
                res.status(406).json({ error: 'Sin ID', message: 'Se necesita el ID del comentario.' });
                return;
            }
            if (!validateUUID.test(id)) {
                res.status(406).json({ error: 'UUID inválido', message: 'El ID del comentario debe ser un UUID válido.' });
                return;
            }
            res.status(201).json({ message: await commentService.deleteComment(id) });
        } catch (error) {
            const err: string = error instanceof Error ? error.message : 'Error desconocido.'
            res.status(404).json({ error: 'Sin información', message: err });
        }
    },
    newComment: async (req: Request, res: Response) => {
        try {
            const { id } = (req as unknown as IAccess)['access'];
            const { body } : { body: NewCommentDTO} = req;
            const valid: NewCommentDTO = plainToInstance(NewCommentDTO, body);
            const errors: ValidationError[] = await validate(valid);
            if(errors.length){
                res.status(400).json(errors.map((error: ValidationError) => ({[error.property]: error.constraints})));
                return;
            };
            res.status(201).json({ message: await commentService.newComment(id, body)});
        } catch (error) {
            const err: string = error instanceof Error ? error.message : 'Error desconocido.'
            res.status(404).json({ error: 'Sin información', message: err });
        };
    },
}