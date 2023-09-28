import UseCase from "../../shared/usecase/usecase";
import User from "../model/User";
import UserRepository from "../repository/UserRepository";

export default class FindManyUser implements UseCase<void, User[]> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(): Promise<User[]> {
        const users = await this.repository.findMany()
        return users;
    }
}