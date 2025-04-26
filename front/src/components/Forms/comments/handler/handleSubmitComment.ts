/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from "react-router-dom";
import Swal from "sweetalert2";

export const SubmitComment = async (e: React.FormEvent<HTMLFormElement>, navigate: NavigateFunction, newComment: string, postReview: any): Promise<void> => {
    e.preventDefault();
    const token: string | null = localStorage.getItem('token');
    try {
        if(!token) throw new Error('Debes iniciar sesión para poder agregar tu comentario.');
        const information: string = await postReview(newComment, token);
        Swal.fire({
            title: information,
            width: 600,
            padding: "3em",
            color: "#fff",
            background: `url("https://mir-s3-cdn-cf.behance.net/project_modules/hd/5c9e06114084301.6034c329b0e28.gif") no-repeat center center`, 
        }).then(() => {
            navigate('/');
        });
    } catch (error) {
        throw error;
    };
};