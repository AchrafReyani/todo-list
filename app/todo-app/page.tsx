import React from 'react'
import AddToDoComponent from './components/AddToDo'
import SignOutButton from '../components/signout/signout'
import { Sign } from 'crypto';


const ToDoAppComponent = () => {
  return (
    <div className="flex flex-col pt-12">
        <SignOutButton />
        <h1 className="text-center">Welcome to My ToDo App</h1>
        <AddToDoComponent />
    </div>
  )
}

export default ToDoAppComponent