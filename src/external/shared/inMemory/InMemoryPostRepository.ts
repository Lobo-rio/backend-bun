import { v4 as uuid} from "uuid";

import Post from "../../../core/posts/model/Post";
import PostRepository from "../../../core/posts/repository/PostRepository";
import { CreatePostRequest } from "../../../core/posts/usecase/CreatePost";
import { UpdatePostRequest } from "../../../core/posts/usecase/UpdatePost";


export default class InMemoryPostRepository  implements PostRepository{
    public posts: Post[] = [];

    async findById(id: string) {
        const post = this.posts.find( post => post.id === id) ?? null;
        return post;
    }

    async findMany() {
        return this.posts;
    }

    async create(data: CreatePostRequest) {
        data.id = uuid();
        data.createdAt = new Date();
        data.updatedAt = new Date();
        this.posts.push(data);
        
        return data;
    }

    async update(data: UpdatePostRequest) {
        const postExisted = this.posts.find((post) => data.id === post.id)
        
        if (postExisted) {
            postExisted.title = data.title
            postExisted.content = data.content
        }

        const postIndex = this.posts.findIndex((post) => data.id === post.id)
        this.posts.splice(postIndex, 1)

        if (postExisted) this.posts.push(postExisted)
    }

    async delete(id: string) {
        const postIndex = this.posts.findIndex((post) => id === post.id)
        this.posts.splice(postIndex, 1)
    }

}