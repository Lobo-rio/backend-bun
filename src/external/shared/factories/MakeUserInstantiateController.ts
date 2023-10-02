import Elysia from "elysia";

import CreateUserController from "../../../adapters/controller/user/CreateUserController";
import DeleteUserController from "../../../adapters/controller/user/DeleteUserController";
import FindByIdUserController from "../../../adapters/controller/user/FindByIdUserController";
import FindManyUserController from "../../../adapters/controller/user/FindManyUserController";
import UpdateUserController from "../../../adapters/controller/user/UpdateUserController";

import InMemoryUserRepository from "../inMemory/InMemoryUserRepository";
import CreateUser from "../../../core/users/usecase/CreateUser";
import DeleteUser from "../../../core/users/usecase/DeleteUser";
import FindByIdUser from "../../../core/users/usecase/FindByIdUser";
import FindManyUser from "../../../core/users/usecase/FindManyUser";
import UpdateUser from "../../../core/users/usecase/UpdateUser";
import Password from "../../../core/shared/password/Password";
import PrismaUserRepository from "../prisma/PrismaUserRepository";
import { PrismaClient } from "@prisma/client";

export function MakeUserInstantiateController(app: Elysia) {
    const prisma = new PrismaClient();
    const inMemoryRepository = new InMemoryUserRepository();
    const prismaRepository = new PrismaUserRepository(prisma);
    const password = new Password();

    const createUser = new CreateUser(prismaRepository, password)
    new CreateUserController(app, createUser);

    const findManyUser = new FindManyUser(prismaRepository)
    new FindManyUserController(app, findManyUser);

    const findByIdUser = new FindByIdUser(prismaRepository)
    new FindByIdUserController(app, findByIdUser);

    const updateUser = new UpdateUser(prismaRepository)
    new UpdateUserController(app, updateUser);

    const deleteUser = new DeleteUser(prismaRepository)
    new DeleteUserController(app, deleteUser);

    return true;
}