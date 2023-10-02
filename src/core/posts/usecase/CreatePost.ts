import { ResourceExistedError } from "../../shared/errors/resource-existed-error";
import Password from "../../shared/password/Password";
import { Either, left, right } from "../../shared/types/either";
import UseCase from "../../shared/usecase/usecase";
import UserRepository from "../../users/repository/UserRepository";
import PostRepository from "../repository/PostRepository";
import Post from "../model/Post";

export type CreatePostRequest = {
    id: string
    authorId: string
    title: string
    content:   string
    published: boolean
    createdAt?: Date
    updatedAt?: Date
}

type CreatePostResponse = Either<
  ResourceExistedError,
  Post
>
export default class CreatePost implements UseCase<CreatePostRequest, CreatePostResponse> {
    constructor(
        private readonly repositoryPost: PostRepository,
        private readonly repositoryUser: UserRepository,
    ) {}

    async executar(data: CreatePostRequest): Promise<CreatePostResponse> {
        const post = await this.repositoryPost.create(data);

        return right(post);
    }
}