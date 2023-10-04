import { beforeEach, describe, expect, it, test } from "bun:test";

import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import InMemoryPostRepository from "../../../external/shared/inMemory/InMemoryPostRepository";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";
import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";
import UpdatePost from "./UpdatePost";
import { makePostCreate } from "../../../../test/factory/MakePostCreate";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryPostRepository: InMemoryPostRepository;
let sut: UpdatePost;

describe('Update User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        inMemoryPostRepository = new InMemoryPostRepository()
        sut = new UpdatePost(inMemoryPostRepository)
    })


    it('should should be possible to change a user fields by identifier', async () => {
        const newUser = makeUserCreate();
        const user = await inMemoryUserRepository.create(newUser);

        const authorId = user.id;
        const newPost = makePostCreate(authorId)

        const result = await inMemoryPostRepository.create(newPost)

        result.title = 'Title Post Update';
        result.content = 'kljdfjjfj jjdkfjkjd jdksfjk djkksdfjk sdfkjsdfkjdfkjdj';
        
        await sut.executar(result);

        expect(inMemoryPostRepository.posts[0].title).toBe('Title Post Update');
        expect(inMemoryPostRepository.posts[0].content).toBe('kljdfjjfj jjdkfjkjd jdksfjk djkksdfjk sdfkjsdfkjdfkjdj');
    })

    it('should should not be possible to update the incorrect identifier', async () => {
        const newUser = makeUserCreate();
        const user = await inMemoryUserRepository.create(newUser);

        const authorId = user.id;
        const newPost = makePostCreate(authorId)

        await inMemoryPostRepository.create(newPost)

        const resultId = await sut.executar({
            id: 'test-id-post',
            title: 'Title Post Update',
            content: 'kljdfjjfj jjdkfjkjd jdksfjk djkksdfjk sdfkjsdfkjdfkjdj'
        });
        
        expect(resultId.value).toBeInstanceOf(ResourceNotFoundError);
    })
})