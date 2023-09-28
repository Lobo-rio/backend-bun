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
        const newUser = makeUserCreate();
        await sut.executar(newUser);

        expect(inMemoryUserRepository.users.length).toBe(1);
    })

    it('should not be possible to register a user with the same email', async () => {
        const newUser = makeUserCreate();
        
        for (let i = 0; i < 2; i++) {
            await sut.executar(newUser);
        }

        expect(inMemoryUserRepository.users.length).toBe(1);
    })
})