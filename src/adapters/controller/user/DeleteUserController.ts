import Elysia from "elysia";
import DeleteUser from "../../../core/users/usecase/DeleteUser";

export default class DeleteUserController {
    constructor(
        readonly server: Elysia,
        readonly deleteUser: DeleteUser
    ) {
        server.delete('/users/:id', async ({ params }) => {
            const { id } = params as any;
            const users = await deleteUser.executar({ id });
            
            return {
                status: 200
            }
        })
    }
}