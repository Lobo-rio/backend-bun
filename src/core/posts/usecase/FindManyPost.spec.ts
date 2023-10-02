import { beforeEach, describe, expect, it } from "bun:test";

import FindManyUser from "./FindManyPost";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import InMemoryPostRepository from "../../../external/shared/inMemory/InMemoryPostRepository";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";
import { makePostCreate } from "../../../../test/factory/MakePostCreate";
import FindManyPost from "./FindManyPost";

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryPostRepository: InMemoryPostRepository;
let sut: FindManyPost;

describe('FindMany User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        inMemoryPostRepository = new InMemoryPostRepository()
        sut = new FindManyPost(inMemoryPostRepository)
    })


    it('should should be possible to search for many ports', async () => {
        for (let i = 0; i < 3; i++) {
            const newUser = makeUserCreate();
            const user = await inMemoryUserRepository.create(newUser);

            const authorId = user.id;
            const newPost = makePostCreate(authorId)

            await inMemoryPostRepository.create(newPost)
        }

        expect(inMemoryPostRepository.posts.length).toBe(3);
    })

    it('should should not be possible to search for many users', async () => {
        expect(inMemoryPostRepository.posts.length).toBe(0);
    })
})