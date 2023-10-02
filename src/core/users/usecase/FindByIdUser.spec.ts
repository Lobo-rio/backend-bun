import { beforeEach, describe, expect, it } from "bun:test";

import FindByIdUser from "./FindByIdUser ";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import Password from "../../shared/password/Password";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";

let inMemoryUserRepository: InMemoryUserRepository;
let sut:FindByIdUser;

describe('FindById User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new FindByIdUser(inMemoryUserRepository)
    })


    it('should should be possible search for a user by identifier', async () => {
        const newUser = makeUserCreate();
        const result = await inMemoryUserRepository.create(newUser)
        const id = result.id;

        const resultId = await sut.executar({ id });
        
        expect(resultId.value).toMatchObject({ id });
    })

    it('should should not be possible to find a user by the incorrect identifier', async () => {
        const newUser = makeUserCreate();
        await inMemoryUserRepository.create(newUser)
        const id = 'test-id-user';

        const resultId = await sut.executar({ id  });
        
        expect(resultId.value.name).toBe('Error');
    })
})