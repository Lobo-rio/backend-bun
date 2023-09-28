import { hash, compare} from "bcryptjs";

export default class Password {
    async hashPassword(password: string): Promise<string> {
        return await hash(password, 6);
    }

    async comparePassword(password: string, passwordUserDB: string): Promise<boolean> {
        return await compare(password, passwordUserDB);
    }
}