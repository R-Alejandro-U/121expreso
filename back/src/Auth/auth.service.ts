import * as bcrypt from 'bcrypt';
import { SALT, SECRET_WORD } from '../configs/envs.config';
import Jwt from 'jsonwebtoken'
import { LoginResponse, UserLoginDTO, UserRegisterDTO } from './auth.dto';
import { userModel } from '../configs/database.config';
import { User } from '../users/User.entity';

const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt: string = await bcrypt.genSalt(SALT);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        const err: string = error instanceof Error ? error.message : 'Error desconocido.'
        throw new Error(`Hubo un error en el hasheo de la contraseña. Error: ${err}`);            
    };
};
const existUser = async (user: Partial<User>): Promise<string | null> => {
    try {
        const exist: User | null = await userModel.findOneBy({email: user.email});
        if(!exist || !exist.isDeleted) return null;
        await userModel.update(exist.id, {...user, isDeleted: false});
        return 'Te has registrado con éxito.';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        
        throw new Error('Hubo un error al registrar al usuario: ' + (error['detail'] || error['message'] || 'Error desconocido.'));
    };
};
export const authService = {
    register: async (user: Omit<UserRegisterDTO, 'passwordConfirmation'>): Promise<string> => {
        try {
            const password: string = await hashPassword(user.password);
            const exist: string | null = await existUser({...user, password});
            if(exist) return exist;
            await userModel.save({ ...user, password});
            return 'Te has registrado con éxito.';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(('Hubo un error al registrar al usuario: ' + (error['detail'] || error['message'] || 'Error desconocido.')));
            throw 'Hubo un error al registrar al usuario: ' + (error['detail'] || error['message'] || 'Error desconocido.');
        };
    },
    login: async ({ email, password }: UserLoginDTO): Promise<LoginResponse> => {
        try {
            const user: User | null = await userModel.findOneBy({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) throw new Error('Contraseña o email incorrectos.');
            if(user.isDeleted) throw new Error('Contraseña o email incorrectos.'); 
            const { id, name, isAdmin } = user;
            const token: string = Jwt.sign({ id, name }, SECRET_WORD, { expiresIn: '1d' });
            return { user: { id, name, isAdmin }, token };
        } catch (error) {
            const err: string = error instanceof Error ? error.message : 'Hubo un error desconocido.';
            throw err;
        };
    }, 
};