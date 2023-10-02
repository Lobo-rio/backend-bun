import Elysia from "elysia";
import FindManyUser from "../../../core/users/usecase/FindManyUser";

export default class FindManyUserController {
    constructor(
        readonly server: Elysia,
        readonly findManyUsers: FindManyUser
    ) {
        server.get('/users', async () => {
            const users = await findManyUsers.executar();
            
            if (users.value.name === 'Error'){
                return new Response(
                    users.value, {
                        status: 400
                    }
                );
            }

            return users.value;
        })
    }
}