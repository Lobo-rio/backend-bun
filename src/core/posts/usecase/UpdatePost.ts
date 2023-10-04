import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";
import { Either, left, right } from "../../shared/types/either";
import UseCase from "../../shared/usecase/usecase";
import PostRepository from "../repository/PostRepository";

export type UpdatePostRequest = {
    id: string
    title: string
    content:   string
}

type UpdatePostResponse = Either<
    ResourceNotFoundError,
    {}
>
export default class UpdatePost implements UseCase<UpdatePostRequest, UpdatePostResponse> {
    constructor(
        private readonly repository: PostRepository,
    ) {}

    async executar(data: UpdatePostRequest): Promise<UpdatePostResponse> {
        const postNotExisted = await this.repository.findById(data.id)
        if (!postNotExisted) return left(new ResourceNotFoundError())
        await this.repository.update(data)
        return right({});
    }
}