import { NextFunction, Request, Response } from "express";
import { Payload } from "../Auth/auth.dto";
import  Jwt  from 'jsonwebtoken'
import { SECRET_WORD } from "../configs/envs.config";
import { IAccess } from "../utils/globalDTOs/access.dto";

export const authorization = (req: Request, res: Response, next: NextFunction): void => {
    const authorization: string | undefined = req.headers.authorization;
    if(!authorization) {
        res.status(401).json({error: 'Sin Autorización', message: 'No cuentas con autorización. Inicia sesión.'});
        return;
    };
    if(!authorization.startsWith('Bearer ')) {
        res.status(403).json({error: 'Tipo de autorización', message: 'No cuentas con el tipo de autorización necesarío. Inicia sesión.'});
        return;
    };
    const token: string | undefined = authorization.split(' ')[1];
    if(!token) {
        res.status(403).json({error: 'Sin token', message: 'No cuentas con el token de autorización. Inicia sesión.'});
        return;
    };
    const payload: Payload | undefined = Jwt.verify(token, SECRET_WORD) as Payload;
    if(!payload) {
        res.status(401).json({error: 'Sin Autorización', message: 'No cuentas con autorización. Inicia sesión.'});
        return;
    };
    (req as unknown as IAccess)['access'] = {
        ...payload,
        exp: new Date(payload.exp * 1000),
        iat: new Date(payload.iat * 1000)
    };
    next();
};