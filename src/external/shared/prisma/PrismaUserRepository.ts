import { PrismaClient } from "@prisma/client";

import User from "../../../core/users/model/User";
import UserRepository from "../../../core/users/repository/UserRepository";
import { UpdateUserRequest } from "../../../core/users/usecase/UpdateUser";

export default class PrismaUserRepository implements UserRepository {

    constructor( 
        private readonly repository: PrismaClient,
    ) {}

    async findById(id: string): Promise<User | null> {
        return await this.repository.user.findUnique({
            where: {
                id
            },
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.user.findUnique({
            where: {
                email
            },
        })
    }

    async findMany(): Promise<User[]> {
        return await this.repository.user.findMany();
    }

    async create(data: User): Promise<User> {
        const user =await this.repository.user.create({
            data,
        })
        return user;
    }

    async update(data: UpdateUserRequest): Promise<void> {
        await this.repository.user.update({
            where: {
              id: data.id,
            },
            data: {
              name: data.name,
              email: data.email,
            },
        })
    }

    async delete(id: string): Promise<void> {
        await this.repository.user.delete({
            where: {
                id
            },
        })
    }

}