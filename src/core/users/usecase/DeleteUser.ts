import UseCase from "../../shared/usecase";
import UserRepository from "../repository/UserRepository";

type DeleteUserRequest = {
    id: string
}

export default class DeleteUser implements UseCase<DeleteUserRequest, void> {
    constructor(
        private readonly repository: UserRepository
    ) {}

    async executar(data: DeleteUserRequest): Promise<void> {
        const user = await this.repository.findById(data.id)
        if (!user) throw new Error('User not found');
        await this.repository.delete(data.id);
    }
}