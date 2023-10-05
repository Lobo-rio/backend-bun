import Elysia from "elysia";
import FindByIdPost from "../../../core/posts/usecase/FindByIdPost";

export default class FindByIdPostController {
    constructor(
        readonly server: Elysia,
        readonly findByIdPost: FindByIdPost
    ) {
        server.get('/posts/:id', async ({ params }) => {
            const { id } = params as any;
            const posts = await findByIdPost.executar({ id });
            
            if (posts.value.name === 'Error'){
                return new Response(
                    posts.value, {
                        status: 400
                    }
                );
            }

            return posts.value;
        })
    }
}