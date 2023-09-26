import UseCase from "../../shared/usecase";
import UserRepository from "../repository/UserRepository";

export type UpdateUserRequest = {
    id: string
    name: string
    email: string
}

export default class UpdateUser implements UseCase<UpdateUserRequest, void> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(data: UpdateUserRequest): Promise<void> {
        const userNotExisted = await this.repository.findById(data.id)
        if (!userNotExisted) throw new Error('User not found!')
        await this.repository.update(data)
    }
}