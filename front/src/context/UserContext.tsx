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

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<string | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? storedUser : null;
    });
    const signup = async (newUser: IRegister): Promise<string> => {
        try {
            const { data } = await axios.post<ISignUpResponse>('https://one21expreso.onrender.com/auth/signup', newUser);
            return data.message; 
        } catch ({ response }: any) {
            console.log(response);
            throw response.data;
        }
    };
    const loginUser = async (LoginUser: DataLogin): Promise<IUser> => {
        try {
            const { data } = await axios.post<ILoginResponse>('https://one21expreso.onrender.com/auth/signin', LoginUser)
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            return data.user;
        } catch ({ response } : any) {
            console.error(response.data);
            throw response.data;
        };
    };
    const logOut = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
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


