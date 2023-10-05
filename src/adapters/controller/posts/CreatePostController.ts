import Elysia from "elysia";
import CreatePost, { CreatePostRequest } from "../../../core/posts/usecase/CreatePost";

export default class CreatePostController {
    constructor(
        readonly server: Elysia,
        readonly createPost: CreatePost
    ) {
        server.post('/posts', async ({ body }) => {
            const { authorId, title, content } = body as CreatePostRequest;
            const post = await createPost.executar({ authorId, title, content });
            
            if (post.value.name === 'Error'){
                return new Response(
                    post.value, {
                        status: 400
                    }
                );
            }

            return post.value;
            
        })
    }
}