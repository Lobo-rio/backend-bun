import { beforeEach, describe, expect, it } from "bun:test";

import FindByIdPost from "./FindByIdPost";
import InMemoryPostRepository from "../../../external/shared/inMemory/InMemoryPostRepository";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import { makePostCreate } from "../../../../test/factory/MakePostCreate";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryPostRepository: InMemoryPostRepository;
let sut: FindByIdPost;

describe('FindById Post', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        inMemoryPostRepository = new InMemoryPostRepository()
        sut = new FindByIdPost(inMemoryPostRepository)
    })


    it('should should be possible search for a post by identifier', async () => {
        const newUser = makeUserCreate();
        const user = await inMemoryUserRepository.create(newUser);
        
        const authorId = user.id;
        const newPost = makePostCreate(authorId)

        const post = await inMemoryPostRepository.create(newPost)
        const id = post.id;

        const resultId = await sut.executar({ id });
        
        expect(resultId.value).toMatchObject({ id });
    })

    it('should should not be possible to find a post by the incorrect identifier', async () => {
        const newUser = makeUserCreate();
        const user = await inMemoryUserRepository.create(newUser);

        const authorId = user.id;
        const newPost = makePostCreate(authorId)

        await inMemoryPostRepository.create(newPost)
        
        const id = 'test-id-post';

        const resultId = await sut.executar({ id  });
        
        expect(resultId.value.name).toBe('Error');
    })
})