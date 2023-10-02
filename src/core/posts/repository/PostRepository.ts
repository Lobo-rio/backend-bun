export default interface PostRepository {
    findById(id: string): Promise<Post | null>;
    findByEmail(id: string): Promise<Post | null>;
    findMany(): Promise<Post[]>;
    create(data: Post): Promise<Post>;
    update(data: UpdatePostRequest): Promise<void>;
    delete(id: string): Promise<void>;
}