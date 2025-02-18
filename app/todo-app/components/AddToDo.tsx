'use client'
import React, { useState } from 'react'
import { db } from '../../lib/firebase/clientApp'
import { addDoc, collection } from 'firebase/firestore'
import  useAuth  from '@/app/lib/hooks/useAuth'
import { addToDo } from '@/app/lib/actions/ToDoActions'
import SubmitButtonComponent from './SubmitButton';

const AddToDoComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const auth = useAuth();
    const addToDoWithUserId = addToDo.bind(null, auth?.uid);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let todo = e.currentTarget.todo.value;
        let obj = {
            todo: todo,
            timestamp: new Date().getTime(),
            complete: false
        }
        // SAVE TO FIREBASE
        const todoRef = collection(db, 'users', auth?.uid,'todos');
        setLoading(true);
        try {
            const docRef = await addDoc(todoRef, obj)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);

            // RESET INPUT AND REFOCUS
            (document.getElementById('todo-input') as HTMLInputElement).value = '';
            (document.getElementById('todo-input') as HTMLInputElement).focus();
        }
        
    }

    return (
        <form action={addToDoWithUserId} className="mt-4 flex justify-center items-center space-x-2">
            <input
                type="text"
                id="todo-input"
                name="todo"
                placeholder="Add todo..."
                required
                className="border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <SubmitButtonComponent />
        </form>
    );
    
}

export default AddToDoComponent