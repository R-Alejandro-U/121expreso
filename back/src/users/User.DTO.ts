import { Comment } from "../comments/Comment.entity";
import { IPages } from "../utils/globalDTOs/pages.dto";

export class UserDTO {
    id!: string;
    name!: string;
    isAdmin!: boolean;
    CreateAcount?: Date;
    comments?: Comment;
}

export class GetUsersResponse {
    users!: UserDTO[];
    pagination_info!: IPages;
};