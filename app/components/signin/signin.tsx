'use client'
import React, { useState } from 'react'
import { auth } from '../../lib/firebase/clientApp';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';


const SignInComponent = () => {

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let email = e.currentTarget.email.value;
        let password = e.currentTarget.password.value;

        setLoading(true);
        setError(null);

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setError(error.message);
            setLoading(false);
        });
    }

    const handleSignUp = () => {
        let email = document.getElementsByName('email')[0] as HTMLInputElement;
        let password = document.getElementsByName('password')[0] as HTMLInputElement;

        setLoading(true);
        setError(null);

        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setError(error.message);
            setLoading(false);
        });
    }

    return (
        <div className="flex justify-center mt-24">
            <form 
                onSubmit={handleSignIn}
                className="grid grid-cols-1 gap-2 w-[350px] min-w-fit items-center justify-center shadow-lg p-6 rounded-md"
            >
                <h1 className="text-center font-bold mb-3">Enter Credentials</h1>
                <input 
                    className='border-2 border-slate-200 px-2 rounded-sm py-1'
                    type="email" 
                    name="email" 
                    placeholder='Email' 
                    required 
                />
                <input 
                    className='border-2 border-slate-200 px-2 rounded-sm py-1'
                    type="password" 
                    name="password" 
                    placeholder='Password' 
                    required
                />
                <button 
                    type='submit'
                    className='bg-blue-500 rounded-md text-white py-1 hover:bg-blue-600 hover:font-bold transition'
                >Log In</button>
                <button 
                    type='button' 
                    className='bg-yellow-500 rounded-md text-white py-1 hover:bg-orange-600 hover:font-bold transition'
                    onClick={handleSignUp}
                >Sign Up</button>
                <p className='text-center'>{ loading ? 'Signing in...' : '' }</p>
                {error && <p className='text-center text-red-500 mt-2'>{error}</p>}
            </form>
        </div>
    )
}

export default SignInComponent
