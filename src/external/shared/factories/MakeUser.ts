import CreateUserController from "../../../adapters/controller/user/CreateUserController";
import DeleteUserController from "../../../adapters/controller/user/DeleteUserController";
import FindByIdUserController from "../../../adapters/controller/user/FindByIdUserController";
import FindManyUserController from "../../../adapters/controller/user/FindManyUserController";
import UpdateUserController from "../../../adapters/controller/user/UpdateUserController";
import { app } from "../../api/config";

import InMemoryUserRepository from "../inMemory/InMemoryUserRepository";
import CreateUser from "../../../core/users/usecase/CreateUser";
import DeleteUser from "../../../core/users/usecase/DeleteUser";
import FindByIdUser from "../../../core/users/usecase/FindByIdUser ";
import FindManyUser from "../../../core/users/usecase/FindManyUser";
import UpdateUser from "../../../core/users/usecase/UpdateUser";

export function MakeUser() {
    const inMemoryRepository = new InMemoryUserRepository();

    const createUser = new CreateUser(inMemoryRepository)
    const createUserController = new CreateUserController(app, createUser);

    const findManyUser = new FindManyUser(inMemoryRepository)
    const findManyUserController = new FindManyUserController(app, findManyUser);

    const findByIdUser = new FindByIdUser(inMemoryRepository)
    const findByIdUserController = new FindByIdUserController(app, findByIdUser);

    const updateUser = new UpdateUser(inMemoryRepository)
    const updateUserController = new UpdateUserController(app, updateUser);

    const deleteUser = new DeleteUser(inMemoryRepository)
    const  deleteUserController = new DeleteUserController(app, deleteUser);

    return {
        createUserController, 
        findManyUserController, 
        findByIdUserController, 
        updateUserController, 
        deleteUserController
    }
}