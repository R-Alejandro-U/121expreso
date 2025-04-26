/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { authService } from "./auth.service";
import { LoginResponse, UserLoginDTO, UserRegisterDTO } from "./auth.dto";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

export const authController = {
    register: async (req: Request, res: Response): Promise<void> => {
        try {
            const { body }: { body: UserRegisterDTO } = req;
            const valid = plainToInstance(UserRegisterDTO, body);
            const errors: ValidationError[] = await validate(valid);
            if(errors.length) {
                res.status(400).json(errors.map((error: ValidationError) => ({[error.property]: error.constraints})))
                return;
            };
            const { passwordConfirmation, ...user} = body;
            res.status(201).json({message: await authService.register(user), status: 201}); 
        } catch (error) {
            res.status(409).json({error, status: 409});
        };
    },
    login: async (req: Request, res: Response): Promise<void> => {
        try {
            const { body } : { body: UserLoginDTO } = req;
            const errors: ValidationError[] = await validate(body);
            if(errors.length) res.status(400).json({errors: errors.map((error: ValidationError) => error.constraints)});
            const header: LoginResponse = await authService.login(body);
            res.status(201).json(header);
        } catch (error) {
            res.status(400).json(error);
        };
    },
}