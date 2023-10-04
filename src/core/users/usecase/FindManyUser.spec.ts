import { beforeEach, describe, expect, it } from "bun:test";

import FindManyUser from "./FindManyUser";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";

let inMemoryUserRepository: InMemoryUserRepository;
let sut:FindManyUser;

describe('FindMany User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new FindManyUser(inMemoryUserRepository)
    })


    it('should should be possible to search for many users', async () => {
        for (let i = 0; i < 3; i++) {
            const newUser = makeUserCreate();
            await inMemoryUserRepository.create(newUser);
        }

        expect(inMemoryUserRepository.users.length).toBe(3);
    })

    it('should should not be possible to search for many users', async () => {
        expect(inMemoryUserRepository.users.length).toBe(0);
    })
})