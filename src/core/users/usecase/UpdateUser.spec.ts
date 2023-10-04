import { beforeEach, describe, expect, it, test } from "bun:test";

import UpdateUser from "./UpdateUser";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";
import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";
import { randomUUID } from "crypto";

let inMemoryUserRepository: InMemoryUserRepository;
let sut:UpdateUser;

describe('Update User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new UpdateUser(inMemoryUserRepository)
    })


    it('should should be possible to change a user fields by identifier', async () => {
        const newUser = makeUserCreate();
        const result = await inMemoryUserRepository.create(newUser);

        result.name = 'Gilberto Medeiros';
        result.email = 'gsi@test.com';
        
        await sut.executar(result);

        expect(inMemoryUserRepository.users[0].name).toBe('Gilberto Medeiros');
        expect(inMemoryUserRepository.users[0].email).toBe('gsi@test.com');
    })

    it('should should not be possible to update the incorrect identifier', async () => {
        const newUser = makeUserCreate();
        await inMemoryUserRepository.create(newUser)
       
        const resultId = await sut.executar({
            id: randomUUID(),
            name: 'GSilva',
            email: 'test@test.com'
        });
        
        expect(resultId.value).toBeInstanceOf(ResourceNotFoundError);
    })
})