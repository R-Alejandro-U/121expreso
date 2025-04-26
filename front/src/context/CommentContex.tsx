/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext, useCallback, useState } from "react";
import { comment, Comments, GetComments, GetCommentsRes } from "./interface/Comment.interface";

export interface ICommentContext {
    postReview: (comment: string, token: string) => Promise<string>,
    getComments: () => Promise<GetComments[]> ,
    reviews: GetComments[] | undefined
}

export const CommentsContext: React.Context<ICommentContext> = createContext<ICommentContext>({
    postReview: async () => ({} as string),
    getComments: async () => ({} as GetComments[]),
    reviews: []
});

export const ReviewsProvider = ({children}: {children: React.ReactNode}) => {
    const [ reviews, setReviews ] = useState<GetComments[] | undefined>();
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
    const getComments = useCallback(async (): Promise<GetComments[]> => {
        try {
            const { data } = await axios<GetCommentsRes>('https://one21expreso.onrender.com/comment');
            const comments: GetComments[] = data.data.comments.map((comment: Comments) => ({...comment, CreateComment: new Date(comment.CreateComment)}));
            setReviews(comments);
            return comments;
        } catch ( { response }: any ) {
            throw response.data;
        };
    }, [setReviews]);
    const value = {
        postReview,
        getComments,
        reviews
    };
    return (
        <CommentsContext.Provider value={value}> 
            {children} 
        </CommentsContext.Provider>
    );
};