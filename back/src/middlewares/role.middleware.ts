import { NextFunction, Request, Response } from "express";
import { Payload } from "../Auth/auth.dto";
import { IAccess } from "../utils/globalDTOs/access.dto";
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const payload: Payload = (req as unknown as IAccess)['access'];
    if(!payload.isAdmin) {
        res.status(401).json({error: 'Sin permisos', message: 'No cuentas con el permiso necesario, solo para administradores.'})
        return;
    };
    next();
};