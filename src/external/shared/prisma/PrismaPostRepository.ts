import { PrismaClient } from "@prisma/client";

import PostRepository from "../../../core/posts/repository/PostRepository";
import Post from "../../../core/posts/model/Post";
import { CreatePostRequest } from "../../../core/posts/usecase/CreatePost";
import { UpdatePostRequest } from "../../../core/posts/usecase/UpdatePost";

export default class PrismaPostRepository implements PostRepository {

    constructor( 
        private readonly repository: PrismaClient,
    ) {}

    async findById(id: string): Promise<Post | null> {
        return await this.repository.post.findUnique({
            where: {
                id
            },
        })
    }

    async findMany(): Promise<Post[]> {
        return await this.repository.post.findMany();
    }

    async create(data: CreatePostRequest): Promise<Post> {
        const post =await this.repository.post.create({
            data: {
                authorId: data.authorId,
                title: data.title,
                content: data.content,
                published: true,
            }
        })
        return post;
    }

    async update(data: UpdatePostRequest): Promise<void> {
        await this.repository.post.update({
            where: {
              id: data.id,
            },
            data: {
              title: data.title,
              content: data.content,
            },
        })
    }

    async delete(id: string): Promise<void> {
        await this.repository.post.delete({
            where: {
                id
            },
        })
    }

}