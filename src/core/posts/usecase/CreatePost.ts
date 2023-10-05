import { Either, left, right } from "../../shared/types/either";
import UseCase from "../../shared/usecase/usecase";
import UserRepository from "../../users/repository/UserRepository";
import PostRepository from "../repository/PostRepository";
import Post from "../model/Post";
import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";

export type CreatePostRequest = {
    id?: string
    authorId: string
    title: string
    content:   string
    published?: boolean
    createdAt?: Date
    updatedAt?: Date
}

type CreatePostResponse = Either<
    ResourceNotFoundError,
    Post
>
export default class CreatePost implements UseCase<CreatePostRequest, CreatePostResponse> {
    constructor(
        private readonly repositoryPost: PostRepository,
        private readonly repositoryUser: UserRepository,
    ) {}

    async executar(data: CreatePostRequest): Promise<CreatePostResponse> {
        const userExisted = await this.repositoryUser.findById(data.authorId);
        if (!userExisted) return left(new ResourceNotFoundError())
        const post = await this.repositoryPost.create(data);

        return right(post);
    }
}