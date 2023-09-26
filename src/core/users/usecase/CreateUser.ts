import UseCase from "../../shared/usecase";
import User from "../model/User";
import UserRepository from "../repository/UserRepository";

export type CreateUserRequest = {
    id?: string
    name: string
    email: string
    password: string
    createdAt?: Date
    updatedAt?: Date
}

export default class CreateUser implements UseCase<CreateUserRequest, void> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(data: CreateUserRequest): Promise<void> {
        const userExisted = await this.repository.findByEmail(data.email)
        if (userExisted) throw new Error('User existed!')
        await this.repository.create(data)
    }
}