import UseCase from "../../shared/usecase";
import User from "../model/User";
import UserRepository from "../repository/UserRepository";

type CreateUserRequest = {
    name: string
    email: string
    password: string
}

type CreateUserResponse = {
    user: User
}

export default class CreateUser implements UseCase<CreateUserRequest, CreateUserResponse> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(data: CreateUserRequest): Promise<CreateUserResponse> {
        const userExisted = await this.repository.findByEmail(data.email)
        if (userExisted) throw new Error('User existed!')
        const user = await this.repository.create(data)
        return { user };
    }
}