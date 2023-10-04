import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";
import { Either, left, right } from "../../shared/types/either";
import UseCase from "../../shared/usecase/usecase";
import PostRepository from "../repository/PostRepository";

type DeletePostRequest = {
    id: string
}

type DeletePostResponse = Either<
    ResourceNotFoundError,
    {}
>

export default class DeletePost implements UseCase<DeletePostRequest, DeletePostResponse> {
    constructor(
        private readonly repository: PostRepository
    ) {}

    async executar(data: DeletePostRequest): Promise<DeletePostResponse> {
        const post = await this.repository.findById(data.id);
        if (!post) return left(new ResourceNotFoundError());
        await this.repository.delete(data.id);
        return right({});
    }
}