import { beforeEach, describe, expect, it } from "bun:test";

import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import InMemoryPostRepository from "../../../external/shared/inMemory/InMemoryPostRepository";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";
import { makePostCreate } from "../../../../test/factory/MakePostCreate";
import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";
import DeletePost from "./DeletePost";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryPostRepository: InMemoryPostRepository;
let sut: DeletePost;

describe('Delete User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        inMemoryPostRepository = new InMemoryPostRepository()
        sut = new DeletePost(inMemoryPostRepository)
    })


    it('should should be possible to delete a post', async () => {
        const newUser = makeUserCreate();
        const user = await inMemoryUserRepository.create(newUser);
        
        const authorId = user.id;
        const newPost = makePostCreate(authorId)

        const post = await inMemoryPostRepository.create(newPost)
        const id = post.id;

        await sut.executar({ id });

        expect(inMemoryPostRepository.posts.length).toBe(0);
    })

    it('should should be possible to delete the incorrect identifier', async () => {
        const newUser = makeUserCreate();
        const user = await inMemoryUserRepository.create(newUser);
        
        const authorId = user.id;
        const newPost = makePostCreate(authorId)

        await inMemoryPostRepository.create(newPost)
        const id = 'test-id-post';

        const resultId = await sut.executar({ id });
        
        expect(resultId.value).toBeInstanceOf(ResourceNotFoundError);
    })
})