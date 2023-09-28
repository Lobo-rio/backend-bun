import User from "../model/User";
import { UpdateUserRequest } from "../usecase/UpdateUser";

export default interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(id: string): Promise<User | null>;
    findMany(): Promise<User[]>;
    create(data: User): Promise<User>;
    update(data: UpdateUserRequest): Promise<void>;
    delete(id: string): Promise<void>;
}