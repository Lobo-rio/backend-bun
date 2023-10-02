import { ResourceExistedError } from "../../shared/errors/resource-existed-error";
import Password from "../../shared/password/Password";
import { Either, left, right } from "../../shared/types/either";
import UseCase from "../../shared/usecase/usecase";
import User from "../model/User";
import UserRepository from "../repository/UserRepository";

export type CreateUserRequest = {
    id: string
    name: string
    email: string
    password: string
    createdAt?: Date
    updatedAt?: Date
}

type CreateUsersResponse = Either<
  ResourceExistedError,
  User
>
export default class CreateUser implements UseCase<CreateUserRequest, CreateUsersResponse> {
    constructor(
        private readonly repository: UserRepository,
        private readonly passwordEncrypt: Password
    ) {
        this.passwordEncrypt = new Password();
    }

    async executar(data: CreateUserRequest): Promise<CreateUsersResponse> {
        const userExisted = await this.repository.findByEmail(data.email)
        if (userExisted) return left(new ResourceExistedError())
        const newPassword = await this.passwordEncrypt.hashPassword(data.password);
        data.password = newPassword;
        
        const user = await this.repository.create(data);

        return right(user);
    }
}