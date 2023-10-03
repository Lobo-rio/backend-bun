import Elysia from "elysia";
import DeletePost from "../../../core/posts/usecase/DeletePost";

export default class DeletePostController {
    constructor(
        readonly server: Elysia,
        readonly deletePost: DeletePost
    ) {
        server.delete('/posts/:id', async ({ params }) => {
            const { id } = params as any;
            const posts = await deletePost.executar({ id });
            
            return {
                status: 200
            }
        })
    }
}