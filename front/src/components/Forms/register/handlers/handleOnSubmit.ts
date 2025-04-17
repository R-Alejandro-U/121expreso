/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from "react-router-dom";
import { IRegister } from "../RegisterForm.interface";
import Swal from "sweetalert2";

export const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>, user: IRegister, signup: any, navigate: NavigateFunction) => {
    try {
        e.preventDefault();
        const data: string = await signup(user);
        Swal.fire({
            title: `Has iniciado sesión. Bienvenida/o ${data}`,
            width: 600,
            padding: "3em",
            color: "#fff",
            background: `url("https://mir-s3-cdn-cf.behance.net/project_modules/hd/5c9e06114084301.6034c329b0e28.gif") no-repeat center center`, 
        }).then(() => {
            navigate('/login');
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