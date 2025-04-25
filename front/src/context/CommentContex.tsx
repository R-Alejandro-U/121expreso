/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext } from "react";
export const CommentsContex: React.Context<any> = createContext<any>({
    postReview: async () => ({} as string),
});
interface comment {
    message: string
};
export const ReviewsProvider = ({children}: {children: React.ReactNode}) => {
    const postReview = async (comment: string, token: string) => {
        try {
            const { data } = await axios.post<comment>('https://one21expreso.onrender.com/comment', {comment}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return data.message;
        } catch ( { response }: any ) {
            console.error(response.data.extra);
            throw response.data.message;
        };
    };
    const value = {
        postReview
    };
    return (
        <CommentsContex.Provider value={value}> 
            {children} 
        </CommentsContex.Provider>
    );
};