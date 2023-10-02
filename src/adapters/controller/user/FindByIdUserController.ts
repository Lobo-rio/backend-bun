import Elysia from "elysia";
import FindByIdUser from "../../../core/users/usecase/FindByIdUser";

export default class FindByIdUserController {
    constructor(
        readonly server: Elysia,
        readonly findByIdUser: FindByIdUser
    ) {
        server.get('/users/:id', async ({ params }) => {
            const { id } = params as any;
            const users = await findByIdUser.executar({ id });
            
            if (users.value.name === 'Error'){
                return new Response(
                    user.value, {
                        status: 400
                    }
                );
            }

            return users.value;
        })
    }
}