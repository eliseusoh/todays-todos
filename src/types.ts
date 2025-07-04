//TYPESCRIPT TYPES 
//Interface = a way to define the shape of an object
export interface Todo {
    id: string;
    text: string;
    category: CategoryType;
    completed: boolean;
    createdAt: Date;
}

//Type = can be a union of specific strings
export type CategoryType = 'work' | 'personal' | 'wellness' | 'creative';