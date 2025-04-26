export interface comment {
    message: string
};

export interface GetComments {
    id: string,
   comment: string,
   CreateComment: Date,
   user: string
}

export interface Comments {
    id: string,
   comment: string,
   CreateComment: string,
   user: string
}

interface IComments {
    comments: Comments[];
};

export interface GetCommentsRes{
    data: IComments
}
