import Elysia from "elysia";

import CreateUserController from "../../../adapters/controller/user/CreateUserController";
import DeleteUserController from "../../../adapters/controller/user/DeleteUserController";
import FindByIdUserController from "../../../adapters/controller/user/FindByIdUserController";
import FindManyUserController from "../../../adapters/controller/user/FindManyUserController";
import UpdateUserController from "../../../adapters/controller/user/UpdateUserController";

import InMemoryUserRepository from "../inMemory/InMemoryUserRepository";
import CreateUser from "../../../core/users/usecase/CreateUser";
import DeleteUser from "../../../core/users/usecase/DeleteUser";
import FindByIdUser from "../../../core/users/usecase/FindByIdUser ";
import FindManyUser from "../../../core/users/usecase/FindManyUser";
import UpdateUser from "../../../core/users/usecase/UpdateUser";
import Password from "../../../core/shared/password/Password";

export function MakeUserInstantiateController(app: Elysia) {
    const inMemoryRepository = new InMemoryUserRepository();
    const password = new Password();

    const createUser = new CreateUser(inMemoryRepository, password)
    new CreateUserController(app, createUser);

    const findManyUser = new FindManyUser(inMemoryRepository)
    new FindManyUserController(app, findManyUser);

    const findByIdUser = new FindByIdUser(inMemoryRepository)
    new FindByIdUserController(app, findByIdUser);

    const updateUser = new UpdateUser(inMemoryRepository)
    new UpdateUserController(app, updateUser);

    const deleteUser = new DeleteUser(inMemoryRepository)
    new DeleteUserController(app, deleteUser);

    return true;
}