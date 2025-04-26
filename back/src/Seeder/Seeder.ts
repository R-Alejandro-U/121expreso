import { QueryRunner } from "typeorm";
import { typeorm } from "../configs/database.config";
import { User } from "../users/User.entity";
import 'dotenv/config'
import { hashPassword } from "../Auth/auth.service";

const data: NodeJS.ProcessEnv = process.env;

export const Seeder = async (): Promise<void> => {
    const queryRunner: QueryRunner = typeorm.createQueryRunner();
    await queryRunner.connect();
    try {
        await queryRunner.startTransaction();
        const model = queryRunner.manager.getRepository(User);
        if(!data['EMAIL']) throw new Error('Por favor, ingrese el mail del administrador.');
        const exist: User | null = await model.findOneBy({email: data['EMAIL']});
        if(!exist) {
            if(!data['PASS']) throw new Error('Por favor, ingrese la contraseña de administrador.');
            if(!data['NAME']) throw new Error('Por favor, ingrese el nombre del administrador.');
            const password: string = await hashPassword(data['PASS']);
            await model.save({name: data['NAME'], password, email: data['EMAIL'], isAdmin: true});
        };
        await queryRunner.commitTransaction();
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        console.log('Termino el proceso de precarga, a la base de datos.');
    };
};