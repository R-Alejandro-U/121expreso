import { IErrors, IRegister } from "../RegisterForm.interface";

export const validate = ({passwordConfirmation, email, name, password}: IRegister): IErrors | undefined => {
    const errors: IErrors = {};
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*(),.?":{}|<>!]).{8,}$/;
    const errorsMessage = {
        name: "El nombre es demasiado corto. Debe tener al menos 4 caracteres.",
        email: "Por favor, ingresa un correo electrónico válido (por ejemplo, usuario@dominio.com).",
        password: "La contraseña debe tener al menos 8 caracteres, incluyendo 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial (como !, @, #, etc.).",
        passwordConfirmation: "Las contraseñas no coinciden. Por favor, verifica que sean iguales."
    };
    if(name.length) {
        if (name.length < 4) errors.name = errorsMessage.name;
    };
    if(password.length && passwordConfirmation.length) {
        if(password !== passwordConfirmation) errors.passwordConfirmation = errorsMessage.passwordConfirmation;
    };
    if(email.length) {
        if(!emailRegex.test(email)) errors.email = errorsMessage.email;
    };
    if(password.length) {
        if(!passwordRegex.test(password)) errors.password = errorsMessage.password;
    };
    return Object.keys(errors).length ? errors : undefined;
};