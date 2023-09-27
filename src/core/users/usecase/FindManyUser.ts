import UseCase from "../../shared/usecase/usecase";
import User from "../model/User";
import UserRepository from "../repository/UserRepository";

type FindManyUserResponse = {
    users: User[]
}

export default class FindManyUser implements UseCase<void, FindManyUserResponse> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(): Promise<FindManyUserResponse> {
        const users = await this.repository.findMany()
        return { users };
    }
}