import { User } from "@prisma/client";

type userDTO = {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt?: Date
}

export const usersPresenters = (data: User[]): Promise<userDTO[]> => {
    const users = data.map(user => { 
        let newUser: userDTO = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };
        return newUser
     })
    return users
}