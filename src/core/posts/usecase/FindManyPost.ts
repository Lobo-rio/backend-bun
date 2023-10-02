import UseCase from "../../shared/usecase/usecase";
import Post from "../model/Post";
import PostRepository from "../repository/PostRepository";

export default class FindManyPost implements UseCase<void, Post[]> {
    constructor(
        private readonly repository: PostRepository
    ) {}

    async executar(): Promise<Post[]> {
        const posts = await this.repository.findMany()
        return posts;
    }
}