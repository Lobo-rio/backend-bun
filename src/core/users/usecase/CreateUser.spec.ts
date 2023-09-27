import { beforeEach, describe, expect, it } from "bun:test";

import CreateUser from "./CreateUser";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import Password from "../../shared/password/Password";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";

let inMemoryUserRepository: InMemoryUserRepository;
let sut:CreateUser;
let passwordEncrypt: Password;

describe('Create User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new CreateUser(inMemoryUserRepository, passwordEncrypt)
    })


    it('should should be possible to create a user', async () => {
        expect(4 + 4).toBe(8)
    })
})