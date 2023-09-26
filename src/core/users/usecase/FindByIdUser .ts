import UseCase from "../../shared/usecase";
import User from "../model/User";
import UserRepository from "../repository/UserRepository";

type FindByIdUserRequest = {
    id: string
}

type FindByIdUserResponse = {
    user: User
}

export default class FindByIdUser implements UseCase<FindByIdUserRequest, FindByIdUserResponse> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(data: FindByIdUserRequest): Promise<FindByIdUserResponse> {
        console.log(data.id)
        const user = await this.repository.findById(data.id)
        if (!user) throw new Error('User not found');
        return { user };
    }
}