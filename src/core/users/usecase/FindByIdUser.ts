import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";
import { Either, left, right } from "../../shared/types/either";
import UseCase from "../../shared/usecase/usecase";
import User from "../model/User";
import UserRepository from "../repository/UserRepository";

type FindByIdUserRequest = {
    id: string
}

type FindByIdUserResponse = Either<
    ResourceNotFoundError,
    User
>
export default class FindByIdUser implements UseCase<FindByIdUserRequest, FindByIdUserResponse> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(data: FindByIdUserRequest): Promise<FindByIdUserResponse> {
        const user = await this.repository.findById(data.id)
        if (!user) return left(new ResourceNotFoundError())

        return right(user);
    }
}