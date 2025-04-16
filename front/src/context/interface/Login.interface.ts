export interface IUser {
    id: string;
    name: string;
    isAdmin: boolean;
};

export interface ILoginResponse {
    user: IUser;
    token: string;
};