import Post from "../model/Post";
import { CreatePostRequest } from "../usecase/CreatePost";

export default interface PostRepository {
    findById(id: string): Promise<Post | null>;
    findMany(): Promise<Post[]>;
    create(data: CreatePostRequest): Promise<Post>;
    update(data: UpdatePostRequest): Promise<void>;
    delete(id: string): Promise<void>;
}