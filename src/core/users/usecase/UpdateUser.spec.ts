import { beforeEach, describe, expect, it } from "bun:test";

import UpdateUser from "./UpdateUser";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import Password from "../../shared/password/Password";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";

let inMemoryUserRepository: InMemoryUserRepository;
let sut:UpdateUser;
let passwordEncrypt: Password;

describe('Update User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new UpdateUser(inMemoryUserRepository)
    })


    it('should should be possible to change a user fields by identifier', async () => {
        expect(4 + 4).toBe(8)
    })
})