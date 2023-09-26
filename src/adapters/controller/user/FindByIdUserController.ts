import Elysia from "elysia";
import FindByIdUser from "../../../core/users/usecase/FindByIdUser ";

export default class FindByIdUserController {
    constructor(
        readonly server: Elysia,
        readonly findByIdUser: FindByIdUser
    ) {
        server.get('/users/:id', async ({ params }) => {
            const { id } = params as any;
            const users = await findByIdUser.executar({ id });
            
            return {
                body: {
                    users
                }
            }
        })
    }
}