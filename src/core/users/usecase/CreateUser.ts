import Password from "../../shared/password/Password";
import UseCase from "../../shared/usecase/usecase";
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
        private readonly repository: UserRepository,
        private readonly passwordEncrypt: Password
    ) {}

    async executar(data: CreateUserRequest): Promise<void> {
        console.log(data)
        const userExisted = await this.repository.findByEmail(data.email)
        if (userExisted) throw new Error('User existed!')
        const newPassword = await this.passwordEncrypt.hashPassword(data.password);
        data.password = newPassword;
        await this.repository.create(data)
    }
}