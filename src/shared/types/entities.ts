// Пользователь 
export interface UserSettings {
    theme: 'light' | 'dark',
    backgroundGradient: string
}

export interface User {
    id: string;
    email: string;
    username: string,
    settings: UserSettings
}

// Список.
export interface List {
    id: string,
    name: string,
    userOwnerId: string,
    color: string
}

// Сама задача
export interface Task {
    id: string,
    title: string,
    description: string,

    startDate?: Date | null,
    endDate?: Date | null,

    userOwnerId: string,
    listOwnerId: string,

    isCompleted: boolean,
    isFavourite: boolean,

    order: number
}