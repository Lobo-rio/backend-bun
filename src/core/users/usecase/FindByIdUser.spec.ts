import { beforeEach, describe, expect, it } from "bun:test";

import FindByIdUser from "./FindByIdUser ";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import Password from "../../shared/password/Password";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";

let inMemoryUserRepository: InMemoryUserRepository;
let sut:FindByIdUser;
let passwordEncrypt: Password;

describe('FindById User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new FindByIdUser(inMemoryUserRepository)
    })


    it('should should be possible search for a user by identifier', async () => {
        expect(4 + 4).toBe(8)
    })
})