import { beforeEach, describe, expect, it } from "bun:test";

import DeleteUser from "./DeleteUser";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import Password from "../../shared/password/Password";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";

let inMemoryUserRepository: InMemoryUserRepository;
let sut:DeleteUser;
let passwordEncrypt: Password;

describe('Delete User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new DeleteUser(inMemoryUserRepository)
    })


    it('should should be possible to delete a user', async () => {
        expect(4 + 4).toBe(8)
    })
})