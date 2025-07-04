import React, { useState, useEffect } from 'react';
import { CategoryType, Todo } from './types';
import TodoItem from './components/TodoItem';
import AddTodoForm from './components/AddTodoForm';

//for local storage
const LOCAL_STORAGE_KEY = 'todo';

//This is a React functional component with TS
//The React.FC part tells TS its a function component
const App: React.FC = () => {
  //STATE WITH TS SECTION
  //state holds an array of todo objects 
  //instead of passing empty array I am passing a function - called lazy initialisation - runs only once when component mounts 
  const [todo, setTodo] = useState<Todo[]>(() => {
    //tries to get saved todos from brower's local storage using key 'todo'
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    //if nothing is found it returns an empty array
    if (!stored) return [];
    //if data is found, try to parse it from a JSON string to JS object 
    //after parsing loop through each todo and copy its properties ...t
    //convert the createdAt string back into real Date object, as JSON doesnt preserve date types
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((t: Todo) => ({
        ...t,
        createdAt: new Date(t.createdAt),
      }));
      //log error is parsing fails 
    } catch (err) {
      console.error('Failed to parse todos from localStorage:', err);
      return [];
    }
  });

  //save todos to local storage whenever the todo array changes 
  //saves current todo list to local storage by converting it to a JSON string
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todo));
  }, [todo]);

  //Toggle complete function
  const toggleComplete = (id: string): void => {
    setTodo(todo.map(todo =>
      todo.id === id //if we find the id to toggle
        //the spread operator copies all existing properties
        //then flips whatever the boolean value was
        ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  //function to add new todo
  const addTodo = (text: string, category: CategoryType): void => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      category,
      completed: false,
      createdAt: new Date()
    }
    //add to existing todos
    setTodo([...todo, newTodo])
  }

  //Function to delete todo
  const deleteTodo = (id: string): void => {
    setTodo(todo.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Today's Todo List
          </span>{' '}
          <span role="img" aria-label="notepad">📝</span>
        </h1>

        <AddTodoForm onAddTodo={addTodo} />
        <div className="mt-6 space-y-4">
          {todo.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
