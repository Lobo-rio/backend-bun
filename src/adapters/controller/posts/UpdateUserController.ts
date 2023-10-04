import Elysia from "elysia";
import UpdatePost from "../../../core/posts/usecase/UpdatePost";

export default class UpdatePostController {
    constructor(
        readonly server: Elysia,
        readonly updatePost: UpdatePost
    ) {
        server.put('/posts', async ({ params, body }) => {
            const { id, title, content } = body as any;
            await updatePost.executar({ id, title, content });
            
            return {
                status: 200,
            }
        })
    }
}