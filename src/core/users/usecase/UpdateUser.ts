import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";
import { Either, left, right } from "../../shared/types/either";
import UseCase from "../../shared/usecase/usecase";
import UserRepository from "../repository/UserRepository";

export type UpdateUserRequest = {
    id: string
    name: string
    email: string
}

type UpdateUserResponse = Either<
    ResourceNotFoundError,
    {}
>
export default class UpdateUser implements UseCase<UpdateUserRequest, UpdateUserResponse> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(data: UpdateUserRequest): Promise<UpdateUserResponse> {
        const userNotExisted = await this.repository.findById(data.id)
        if (!userNotExisted) return left(new ResourceNotFoundError())
        await this.repository.update(data)
        return right({});
    }
}