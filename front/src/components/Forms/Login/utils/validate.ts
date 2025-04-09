import { IErrors } from "../../../../../utils/Errors.interface";
import { DataLogin } from "../LoginForm.interface";

export const validate = (login: DataLogin): IErrors => {
    const errors: IErrors = {};
    if(!login.email) errors.email = 'El mail no puede estar vacio.';
    if(!login.password) errors.password = 'La contraseña no puede estar vacia.';
    return errors;
};