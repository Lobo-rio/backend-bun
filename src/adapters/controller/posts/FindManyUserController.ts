import Elysia from "elysia";
import FindManyPost from "../../../core/posts/usecase/FindManyPost";

export default class FindManyPostController {
    constructor(
        readonly server: Elysia,
        readonly findManyPosts: FindManyPost
    ) {
        server.get('/posts', async () => {
            const posts = await findManyPosts.executar();
            
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