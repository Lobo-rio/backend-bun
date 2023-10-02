import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";
import { Either, left, right } from "../../shared/types/either";
import UseCase from "../../shared/usecase/usecase";
import UserRepository from "../repository/UserRepository";

type DeleteUserRequest = {
    id: string
}

type DeleteUserResponse = Either<
    ResourceNotFoundError,
    {}
>

export default class DeleteUser implements UseCase<DeleteUserRequest, DeleteUserResponse> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(data: DeleteUserRequest): Promise<DeleteUserResponse> {
        const user = await this.repository.findById(data.id);
        if (!user) return left(new ResourceNotFoundError());
        await this.repository.delete(data.id);
        return right({});
    }
}