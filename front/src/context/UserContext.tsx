/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext, useState } from "react";
import { ILoginResponse, IUser } from "./interface/Login.interface";
import { DataLogin } from "../components/Forms/Login/LoginForm.interface";

export const UserContext = createContext<any>({
    user: null,
    loginUser: async () => ({} as IUser),
    logOut: () => {},
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<string | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? storedUser : null;
    });
    const loginUser = async(LoginUser: DataLogin): Promise<IUser> => {
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
        loginUser,
        logOut,
    };
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}


