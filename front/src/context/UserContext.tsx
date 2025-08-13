/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext, useState } from "react";
import { ILoginResponse, ISignUpResponse, IUser } from "./interface/Login.interface";
import { DataLogin } from "../components/Forms/Login/LoginForm.interface";
import { IRegister } from "../components/Forms/register/RegisterForm.interface";

export const UserContext = createContext<any>({
    user: null,
    signup: async () => ({} as string),
    loginUser: async () => ({} as IUser),
    logOut: () => {},
});

interface user {
    user: string | null
}

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<user>({
        user: null,
    });
    const signup = async (newUser: IRegister): Promise<string> => {
        try {
            const { data } = await axios.post<ISignUpResponse>('https://121expreso.vercel.app/api/auth/signup', newUser);
            return data.message; 
        } catch ({ response }: any) {
            throw response.data;
        }
    };
    const loginUser = async (LoginUser: DataLogin): Promise<IUser> => {
        try {
            const { data } = await axios.post<ILoginResponse>('https://121expreso.vercel.app/api/auth/signin', LoginUser)
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            setUser({user: data.user.id})
            return data.user;
        } catch ({ response } : any) {
            throw response.data;
        };
    };
    const logOut = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser({user: null})
    };
    const value = {
        user,
        signup,
        loginUser,
        logOut,
    };
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}


