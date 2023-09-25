import User from "../model/User";

export default interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(id: string): Promise<User | null>;
    findMany(id: string): Promise<User | null>;
    create(data: Partial<User>): Promise<User | null>;
    update(id: string): Promise<void>;
    delete(id: string): Promise<void>;
}