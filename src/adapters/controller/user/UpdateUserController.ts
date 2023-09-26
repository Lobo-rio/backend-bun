import Elysia from "elysia";
import UpdateUser from "../../../core/users/usecase/UpdateUser";

export default class UpdateUserController {
    constructor(
        readonly server: Elysia,
        readonly updateUser: UpdateUser
    ) {
        server.put('/users', async ({ params, body }) => {
            const { id, name, email } = body as any;
            await updateUser.executar({ id, name, email });
            
            return {
                status: 200,
            }
        })
    }
}