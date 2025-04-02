import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";
import { IsPasswordConfirmationMatch } from "../utils/ConfirmationPassword.pipe";

export class UserRegisterDTO {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(4, 100, { message: 'El mínimo es de 4 caracteres' })
    name!: string;

    @IsEmail(undefined, { message: 'El mail no puede estar vacío.' })
    @IsNotEmpty({ message: 'Debe ser un mail valido.' })
    email!: string;

    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minUppercase: 1
        },
        { message: 'La contraseña debe tener un mínimo de 8 caracteres. 1 letra mayúscula, 1 letra minúscula, 1 número y un símbolo.' }
    )
    password!: string;

    @IsNotEmpty({
        message: 'El campo confirmación de contraseña no debe estar vacío.',
    })
    @IsPasswordConfirmationMatch({message: 'La contraseña no coincidencia.'})
    passwordConfirmation!: string;

    @IsEmpty({message: 'Esta propiedad no es aceptada.'})
    isAdmin?: boolean;

    @IsEmpty({message: 'Esta propiedad no es aceptada.'})
    isDeleted?: boolean;
};

export class UserLoginDTO {
    @IsNotEmpty({ message: 'El mail no puede estar vacío.' })
    email!: string;
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    password!: string;
};

export class Payload {
    sub!: string;
    id!: string;
    name!: string;
    isAdmin!: boolean;
    isDeleted!: boolean;
    exp!: any;
    iat!: any;
};

interface IUser {
    id: string;
    name: string;
    isAdmin: boolean;
};

export class LoginResponse {
    user!: IUser;
    token!: string;
};