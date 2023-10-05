import Elysia from "elysia";
import { PrismaClient } from "@prisma/client";

import InMemoryPostRepository from "../inMemory/InMemoryPostRepository";
import PrismaPostRepository from "../prisma/PrismaPostRepository";
import CreatePost from "../../../core/posts/usecase/CreatePost";
import CreatePostController from "../../../adapters/controller/posts/CreatePostController";
import FindManyPost from "../../../core/posts/usecase/FindManyPost";
import FindManyPostController from "../../../adapters/controller/posts/FindManyPostController";
import FindByIdPost from "../../../core/posts/usecase/FindByIdPost";
import FindByIdPostController from "../../../adapters/controller/posts/FindByIdPostController";
import UpdatePost from "../../../core/posts/usecase/UpdatePost";
import UpdatePostController from "../../../adapters/controller/posts/UpdatePostController";
import DeletePost from "../../../core/posts/usecase/DeletePost";
import DeletePostController from "../../../adapters/controller/posts/DeletePostController";
import PrismaUserRepository from "../prisma/PrismaUserRepository";

export function MakePostInstantiateController(app: Elysia) {
    const prisma = new PrismaClient();
    const inMemoryRepository = new InMemoryPostRepository();
    const prismaPostRepository = new PrismaPostRepository(prisma);
    const prismaUserRepository = new PrismaUserRepository(prisma);
    
    const createPost = new CreatePost(prismaPostRepository, prismaUserRepository)
    new CreatePostController(app, createPost);

    const findManyPost = new FindManyPost(prismaPostRepository)
    new FindManyPostController(app, findManyPost);

    const findByIdPost = new FindByIdPost(prismaPostRepository)
    new FindByIdPostController(app, findByIdPost);

    const updatePost = new UpdatePost(prismaPostRepository)
    new UpdatePostController(app, updatePost);

    const deletePost = new DeletePost(prismaPostRepository)
    new DeletePostController(app, deletePost);

    return true;
}