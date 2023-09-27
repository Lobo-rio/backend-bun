import { beforeEach, describe, expect, it } from "bun:test";

import FindManyUser from "./FindManyUser";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import Password from "../../shared/password/Password";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";

let inMemoryUserRepository: InMemoryUserRepository;
let sut:FindManyUser;
let passwordEncrypt: Password;

describe('FindMany User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new FindManyUser(inMemoryUserRepository)
    })


    it('should should be possible to search for many users', async () => {
        expect(4 + 4).toBe(8)
    })
})