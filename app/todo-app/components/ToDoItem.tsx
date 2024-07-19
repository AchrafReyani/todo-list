import useAuth from '@/app/lib/hooks/useAuth';
import React from 'react'
import { doc, updateDoc, deleteDoc} from 'firebase/firestore';
import { db } from '@/app/lib/firebase/clientApp';


const ToDoItemComponent = ({ todo } : {todo: {id: string, todo: string, timestamp: number, complete: boolean}}) => {
  

    const auth = useAuth();

    const handleCheckBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!auth) return;
        let checked = e.target.checked;
        let docref = doc(db, 'users', auth?.uid, 'todos', todo.id);
        await updateDoc(docref, {
            complete: checked
        });
    }

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        if(!auth) return;
        let newVal = e.target.value;
        let docRef = doc(db, 'users', auth?.uid, 'todos', todo.id);
        await updateDoc(docRef, {
            todo: newVal
        });
    }

    const handleDelete = async () => {
        if(!auth) return;
        let docRef = doc(db, 'users', auth?.uid, 'todos', todo.id);
        await deleteDoc(docRef);
    }



    return (
    <div className="flex mx-1 hover:bg-slate-300">
        <input type="checkbox" checked={todo.complete} onChange={handleCheckBox}/>
        <input
            onBlur={handleBlur}
            type="text"
            defaultValue={todo.todo}
            disabled={todo.complete}
            className={
                todo.complete ? 'border-0 ml-3 focus:border-0 focus:outline-none focus:ring-0 rounded-none line-through hover:bg-slate-300'
                : 'border-0 ml-3 focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:border-b-2 focus:outline-none focus:ring-0 rounded-none hover:bg-slate-300'
            }
        />
        <button onClick={handleDelete}>x</button>
    </div>
  )
}

export default ToDoItemComponent