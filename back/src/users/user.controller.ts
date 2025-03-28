/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';
import { userService } from './user.service';

export const userController = {
    getUserById: async (req: Request, res: Response): Promise<void> => {
        try {
            const validateUUID: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
            const id: string | undefined = req.params['id'];
            if (!id) {
                res.status(406).json({ error: 'Sin ID', message: 'Se necesita el ID del usuario.' });
                return;
            }
            if (!validateUUID.test(id)) {
                res.status(406).json({ error: 'UUID inválido', message: 'El ID del usuario debe ser un UUID válido.' });
                return;
            }
            res.status(200).json({ user: await userService.getUserById(id) });
        } catch (error) {
            const err: string = error instanceof Error ? error.message : 'Error desconocido.'
            res.status(404).json({ error: 'Sin información', message: err });
        }
    },
    getUserByName: async (req: Request, res: Response): Promise<void> => {
        try {
            const name: any = req.query['name'];
            let page: any = req.query['page'];
            let limit: any = req.query['limit'];
            if (!page || isNaN(parseInt(page, 10))) page = 1;
            if (!limit || isNaN(parseInt(limit, 10))) limit = 10;
            if (!name) {
                res.status(406).json({ error: 'Sin nombre', message: 'Se necesita el nombre del usuario.' });
                return;
            }
            res.status(200).json({ user: await userService.getUserByName(name, +page, +limit) });
        } catch (error) {
            const err: string = error instanceof Error ? error.message : 'Error desconocido.'
            res.status(404).json({ error: 'Sin coincidencias', message: err });
        };
    },
    getAllUsers: async (req: Request, res: Response): Promise<void> => {
        try {
            let page: any = req.query['page'];
            let limit: any = req.query['limit'];
            if (!page || isNaN(parseInt(page, 10))) page = 1;
            if (!limit || isNaN(parseInt(limit, 10))) limit = 10;
            res.status(200).json({ data: await userService.getAllUsers(+page, +limit) });
        } catch (error) {
            const err: string = error instanceof Error ? error.message : 'Error desconocido.'
            res.status(404).json({ error: 'Sin información', message: err });
        };
    },
    deleteUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const validateUUID: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
            const id: string | undefined = req.params['id'];
            if (!id) {
                res.status(406).json({ error: 'Sin ID', message: 'Se necesita el ID del usuario.' });
                return;
            }
            if (!validateUUID.test(id)) {
                res.status(406).json({ error: 'UUID inválido', message: 'El ID del usuario debe ser un UUID válido.' });
                return;
            }
            res.status(200).json({ message: await userService.deleteUser(id) });
        } catch (error) {
            const err: string = error instanceof Error ? error.message : 'Error desconocido.'
            res.status(404).json({ error: 'Sin información', message: err });
        }
    },
};