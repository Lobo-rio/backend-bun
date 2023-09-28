import { faker } from "@faker-js/faker"
import { CreateUserRequest } from "../../src/core/users/usecase/CreateUser";

export function makeUserCreate() {
    const user: CreateUserRequest = {
        name: faker.person.fullName(),
        email: 'jhondog@example.com',
        password: 'closure'
    };
    
    return user;
}