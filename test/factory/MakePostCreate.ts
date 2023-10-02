import { faker } from "@faker-js/faker"

import { CreatePostRequest } from "../../src/core/posts/usecase/CreatePost";

export function makePostCreate(authorId: string) {
    const post: Partial<CreatePostRequest> = {
        authorId,
        title: faker.company.name(),
        content: faker.lorem.sentence(),
        published: true
    };
    
    return post;
}