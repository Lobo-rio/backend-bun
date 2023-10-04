import { beforeEach, describe, expect, it } from "bun:test";

import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import InMemoryPostRepository from "../../../external/shared/inMemory/InMemoryPostRepository";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";
import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";
import CreatePost from "./CreatePost";
import { makePostCreate } from "../../../../test/factory/MakePostCreate";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryPostRepository: InMemoryPostRepository;
let sut:CreatePost;

describe('Create Post', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        inMemoryPostRepository = new InMemoryPostRepository()
        sut = new CreatePost(inMemoryPostRepository, inMemoryUserRepository)
    })


    it('should should be possible to create a post', async () => {
        const newUser = makeUserCreate();
        const user = await inMemoryUserRepository.create(newUser)

        const authorId = user.id;
        const newPost = makePostCreate(authorId)

        await sut.executar(newPost);

        expect(inMemoryPostRepository.posts.length).toBe(1);
    })

    it('should should not be possible to create a post if the author is not registered', async () => {
        const newUser = makeUserCreate();
        await inMemoryUserRepository.create(newUser)

        const authorId = 'test-id-author';
        const newPost = makePostCreate(authorId)

        const resultAuthor = await sut.executar(newPost);

        expect(resultAuthor.value.name).toBe('Error');
    })
})