import { v4 as uuid} from "uuid";

import UserRepository from "../../../core/users/repository/UserRepository";
import { CreateUserRequest } from "../../../core/users/usecase/CreateUser";
import { UpdateUserRequest } from "../../../core/users/usecase/UpdateUser";
import User from "../../../core/users/model/User";


export default class InMemoryUserRepository  implements UserRepository{
    public users: User[] = [];

    async findById(id: string) {
        const user = this.users.find( user => user.id === id) ?? null;
        return user;
    }

    async findByEmail(email: string) {
        const user = this.users.find( user => user.email === email) ?? null;
        return user;
    }

    async findMany() {
        return this.users;
    }

    async create(data: CreateUserRequest) {
        data.id = uuid();
        data.createdAt = new Date();
        data.updatedAt = new Date();
        this.users.push(data);
        
        return data;
    }

    async update(data: UpdateUserRequest) {
        const userExisted = this.users.find((user) => data.id === user.id)
        
        if (userExisted) {
            userExisted.name = data.name
            userExisted.email = data.email 
        }

        const userIndex = this.users.findIndex((user) => data.id === user.id)
        this.users.splice(userIndex, 1)

        if (userExisted) this.users.push(userExisted)
    }

    async delete(id: string) {
        const userIndex = this.users.findIndex((user) => id === user.id)
        this.users.splice(userIndex, 1)
    }

}