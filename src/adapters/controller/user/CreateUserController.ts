import Elysia from "elysia";
import CreateUser from "../../../core/users/usecase/CreateUser";

export default class CreateUserController {
    constructor(
        readonly server: Elysia,
        readonly createUser: CreateUser
    ) {
        server.post('/users', async ({ body }) => {
            const { name, email, password } = body as any;
            const user = await createUser.executar({ name, email, password });
            
            return user;
        })
    }
}