import React, { useState } from 'react';
import { CategoryType } from '../types';


//props the form component expects
interface AddTodoFormProps {
    onAddTodo: (text: string, category: CategoryType) => void; //function to call when form submits
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
    //local state for form inputs
    //these track what the user is typing
    const [text, setText] = useState<string>('')
    const [category, setCategory] = useState<CategoryType>('personal')

    //handle form submission
    //FormEvent is the TS type for form events
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault() //prevents page refresh

        //dont submit if text is empty
        if (text.trim() === '') return;

        //call parents function with our form data
        onAddTodo(text, category);

        //clear form on submission
        setText('');
    }

    return (
        <form onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4" >
            {/* text input */}
            <input
                type='text'
                value={text}
                placeholder='Add a new todo...'
                onChange={(e) => setText(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md
                 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* category select */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                <option value='personal'>Personal</option>
                <option value='work'>Work</option>
                <option value='wellness'>Wellness</option>
                <option value='creative'>Creative</option>
            </select>

            {/* submit button */}
            <button type='submit'
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >Add Todo</button>
        </form>
    )
}

export default AddTodoForm;