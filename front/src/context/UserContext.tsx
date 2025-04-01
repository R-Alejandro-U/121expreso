import axios from "axios";
import { createContext, useState } from "react";


export const UserContext = createContext({
    user: "",
    registerUser: async() => {},
    loginUser: async() => {},
    logOut: () => {},
})

export const UserProvider = ({children}: {children: React.ReactNode}) => {

    const [user, setUser] = useState(localStorage.getItem("user") ?? false)

    const registerUser = async(userData) => {
        console.log(userData)
        const userR = await axios.post("http://localhost:3000/users/register", userData)
        return userR
    }

    const loginUser = async(LoginUser) => {
        const res = await axios.post("http://localhost:3000/users/login", LoginUser)
        localStorage.setItem("user", res.data.user.id);
        setUser(res.data.user.id)
        return res;
    }

    const logOut = () => {
        localStorage.removeItem("user")
        setUser(false)
    }


    const value = {
        user,
        registerUser,
        loginUser,
        logOut,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}


