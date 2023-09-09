import { randomUUID } from 'crypto';

export type User = {
    id: string;
    username: string;
    isPlaying: boolean;
};
let userStore: Record<string, User> = {};

const generateRandomUsername = () => {
    const randomId = randomUUID();
    return `User_${randomId.substr(0, 8)}`; // Dla przykładu, User_12345678
};
export const isUsernameAvailable = (username: string) => {
    const users = Object.values(userStore);
    return !users.some((user) => user.username.toLowerCase() === username.toLowerCase());
};

export const createUser = () => {
    const id = randomUUID();
    let username = generateRandomUsername();

    // Sprawdź, czy nazwa jest dostępna
    while (!isUsernameAvailable(username)) {
        username = generateRandomUsername();
    }

    userStore[id] = {
        id,
        username,
        isPlaying: false,
    };

    return userStore; // return new user id
};

export const getUsers = () => {
    return Object.values(userStore);
}

export const getUserById = (userId: string) => {
    return userStore[userId];
}

export const updateUser = (user: User) => {
    userStore[user.id] = user;
}
export const deleteUserById = (userId: string) => {
    if (userStore[userId]) {
        delete userStore[userId];
    }
}



