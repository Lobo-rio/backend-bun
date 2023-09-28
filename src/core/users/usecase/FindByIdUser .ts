import UseCase from "../../shared/usecase/usecase";
import User from "../model/User";
import UserRepository from "../repository/UserRepository";

type FindByIdUserRequest = {
    id: string
}

export default class FindByIdUser implements UseCase<FindByIdUserRequest, User> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(data: FindByIdUserRequest): Promise<User> {
        const user = await this.repository.findById(data.id)
        if (!user) throw new Error('User not found');
        return user;
    }
}