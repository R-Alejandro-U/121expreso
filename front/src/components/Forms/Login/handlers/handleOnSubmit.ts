/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from "react-router-dom";
import { IUser } from "../../../../context/interface/Login.interface";
import { DataLogin } from "../LoginForm.interface";
import Swal from 'sweetalert2'


export const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>, user: DataLogin, loginUser: any, navigate: NavigateFunction) => {
    try {
        e.preventDefault();
        const information: IUser = await loginUser(user);
        Swal.fire({
            title: `Has iniciado sesión. Bienvenida/o ${information.name}`,
            width: 600,
            padding: "3em",
            color: "#fff",
            background: `url("https://mir-s3-cdn-cf.behance.net/project_modules/hd/5c9e06114084301.6034c329b0e28.gif") no-repeat center center`, 
        }).then(() => {
            navigate('/');
        });
    } catch (error: any) {
        return Swal.fire({
            title: `${error}`,
            width: 600,
            padding: "3em",
            color: "#fff",
            background: `url("https://mir-s3-cdn-cf.behance.net/project_modules/hd/5c9e06114084301.6034c329b0e28.gif") no-repeat center center`,
        });
    };
};