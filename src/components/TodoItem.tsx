import React from "react";
import { Todo } from '../types';

//define what props this component expecsts
interface TodoItemProps {
    todo: Todo; //the todo object to display
    onToggleComplete: (id: string) => void; //function to call when checkbox is clicked 
    onDelete: (id: string) => void;
}

//styling different depending on the category
const getCategoryStyle = (category: string) => {
    switch (category) {
        case 'personal':
            return 'bg-pink-100 text-pink-700';
        case 'work':
            return 'bg-blue-100 text-blue-700';
        case 'wellness':
            return 'bg-green-100 text-green-700';
        case 'creative':
            return 'bg-orange-100 text-orange-700';
        default:
            return 'bg-grey-100 text-grey-700'
    }
}

//todo item componenet - displays a single todo
//React.FC<TodoItemProps> tells TS this componenet uses TodoItemProps
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
    return (
        <div className="flex items-center justify-between bg-white
         border border-gray-200 rounded-md p-4 shadow-sm">

            {/* Left side: checkbox + text */}
            <div className="flex items-center gap-3">
                {/* checkbox input - checked state comes from todo.completed*/}
                <input
                    type='checkbox'
                    checked={todo.completed}
                    //when changed, call the parent's toggle function with this todo's id
                    onChange={() => onToggleComplete(todo.id)}
                    style={{ marginRight: '10px', width: '20px', height: '20px', color: 'red' }}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-400"
                />

                {/* todo text - applies strikethough if completed */}
                <span
                    className={`text-base sm:text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}
                >
                    {todo.text}
                </span>
            </div>

            {/* Right side: category + delete */}
            <div className="flex items-center gap-3">
                <span className={`text-xs sm:text-sm font-semibold px-3 py-1
                 rounded-full capitalize ${getCategoryStyle(todo.category)}`}>
                    {todo.category}
                </span>

                <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-700
                 text-sm transition">
                    Delete
                </button>
            </div>
        </div>

    )

}

export default TodoItem;