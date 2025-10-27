// src/types/entities.ts

// Пользователь нашего приложения
export interface User {
    id: string;
    email: string;
    username: string;
}

// Списки задач (бывшие "метки"). У задачи может быть только один такой список.
export interface List {
    id: string;
    name: string;
    userOwnerId: string;
    color: string;
}

// Сама задача
export interface Task {
    id: string;
    title: string;
    description?: string; // Описание может быть, а может и не быть (необязательное поле)

    startDate?: Date;
    endDate?: Date;

    userOwnerId: string;
    listOwnerId: string;

    isCompleted: boolean;
    isFavourite: boolean;
}