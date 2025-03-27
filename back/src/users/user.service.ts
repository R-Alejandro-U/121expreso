/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { userModel } from "../configs/database.config";
import { User } from "./User.entity";
import { GetUsersResponse, UserDTO } from "./User.DTO";

export const userService = {
    getUserById: async (id: string): Promise<UserDTO> => {
        try {
            const user: User | null = await userModel.findOne({ where: { id }, relations: ["comments"] });
            if (!user) throw new Error('No existe este usuario en la base de datos.');
            const { password, ...filterUser } = user;
            return filterUser;            
        } catch (error) {
            throw error;
        };
    },
    getUserByName: async (name: string, page: number, limit: number): Promise<UserDTO[]> => {
        try {
            const offset: number = (page - 1) * limit;
            const user: User[] | null = await userModel
                .createQueryBuilder("user")
                .where('LOWER(user.name) LIKE :name', { name: `%${name.toLowerCase()}%` })
                .orderBy('user.name', 'ASC')
                .skip(offset)
                .limit(limit)
                .getMany();
            if (!user.length) throw new Error(`No existen coincidencias con ${name}`);
            return user.map((user: User) => {
                const { password, ...partialUser } = user;
                return partialUser;
            });
        } catch (error) {
            throw error;
        };
    },
    getAllUsers: async (page: number, limit: number): Promise<GetUsersResponse> => {
        try {
            const users: User[] = await userModel.find({ relations: ["comments"] });
            if (!users.length) throw new Error('No hay usuarios registrados.');
            const total_items: number = users.length;
            const max_pages: number = Math.ceil(total_items / limit);
            const current_page: number = Math.min(Math.max(1, page), max_pages);
            const init: number = (current_page - 1) * limit; // Corrección: quitamos el "-" por "*"
            const end: number = Math.min(current_page * limit, total_items);
            const partialUser: UserDTO[] = users
                .slice(init, end)
                .map((user: User) => {
                    const { password, ...partialUser } = user;
                    return partialUser;
                });
            return {
                users: partialUser,
                pagination_info: {
                    total_items,
                    max_pages,
                    page: current_page,
                    current_users: partialUser.length
                }
            };
        } catch (error) {
            throw error;            
        };
    },
    deleteUser: async (id: string): Promise<string> => {
        try {
            const user: UserDTO = await userService.getUserById(id);
            console.log('user', user)
            await userModel.update(user.id, { isDeleted: true });
            return `El usuario se ha eliminado correctamente.`;
        } catch (error) {
            console.log(error);
            throw error; 
        };
    }
};