import { Elysia } from "elysia";

import InMemoryUserRepository from "./external/inMemory/InMemoryUserRepository";
import CreateUserController from "./adapters/controller/user/CreateUserController";
import CreateUser from "./core/users/usecase/CreateUser";
import FindManyUser from "./core/users/usecase/FindManyUser";
import FindManyUserController from "./adapters/controller/user/FindManyUserController";
import FindByIdUser from "./core/users/usecase/FindByIdUser ";
import FindByIdUserController from "./adapters/controller/user/FindByIdUserController";
import UpdateUser from "./core/users/usecase/UpdateUser";
import UpdateUserController from "./adapters/controller/user/UpdateUserController";
import DeleteUser from "./core/users/usecase/DeleteUser";
import DeleteUserController from "./adapters/controller/user/DeleteUserController";

const app = new Elysia();

const inMemoryRepository = new InMemoryUserRepository();

const createUser = new CreateUser(inMemoryRepository)
new CreateUserController(app, createUser);

const findManyUser = new FindManyUser(inMemoryRepository)
new FindManyUserController(app, findManyUser);

const findByIdUser = new FindByIdUser(inMemoryRepository)
new FindByIdUserController(app, findByIdUser);

const updateUser = new UpdateUser(inMemoryRepository)
new UpdateUserController(app, updateUser);

const deleteUser = new DeleteUser(inMemoryRepository)
new DeleteUserController(app, deleteUser);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
