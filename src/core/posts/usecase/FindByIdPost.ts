import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";
import { Either, left, right } from "../../shared/types/either";
import UseCase from "../../shared/usecase/usecase";
import Post from "../model/Post";
import PostRepository from "../repository/PostRepository";

type FindByIdPostRequest = {
    id: string
}

type FindByIdPostResponse = Either<
    ResourceNotFoundError,
    Post
>
export default class FindByIdPost implements UseCase<FindByIdPostRequest, FindByIdPostResponse> {
    constructor(
        private readonly repository: PostRepository
    ) {}

    async executar(data: FindByIdPostRequest): Promise<FindByIdPostResponse> {
        const post = await this.repository.findById(data.id)
        if (!post) return left(new ResourceNotFoundError())

        return right(post);
    }
}