import { beforeEach, describe, expect, it } from "bun:test";

import DeleteUser from "./DeleteUser";
import InMemoryUserRepository from "../../../external/shared/inMemory/InMemoryUserRepository";
import { makeUserCreate } from "../../../../test/factory/MakeUserCreate";
import { ResourceNotFoundError } from "../../shared/errors/resource-not-found-error";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: DeleteUser;

describe('Delete User', () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        sut = new DeleteUser(inMemoryUserRepository)
    })


    it('should should be possible to delete a user', async () => {
        const newUser = makeUserCreate();
        const result = await inMemoryUserRepository.create(newUser)
        const id = result.id;

        await sut.executar({ id });

        expect(inMemoryUserRepository.users.length).toBe(0);
    })

    it('should should be possible to delete the incorrect identifier', async () => {
        const newUser = makeUserCreate();
        await inMemoryUserRepository.create(newUser)
        const id = 'test-id-user';

        const resultId = await sut.executar({ id });
        
        expect(resultId.value).toBeInstanceOf(ResourceNotFoundError);
    })
})