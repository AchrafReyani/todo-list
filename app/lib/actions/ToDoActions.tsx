'use server'
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export const addToDo = async (userId: string,FormData: FormData) => {
    let todo = FormData.get('todo');
    let app: any = await getApp();
    if(!app) return;
    const db = getFirestore(app);
    const todoRef = collection(db, 'users', userId, 'todos');
    await addDoc(todoRef, {
        todo,
        timestamp: new Date().getTime(),
        complete: false
    });
}

export const updateToDo = async(userId: string, docId: string, newVal: string) => {
    let app: any = await getApp();
    if(!app) return;
    const db = getFirestore(app);
    let docRef = doc(db, "users", userId, 'todos', docId);
    await updateDoc(docRef, { todo: newVal});
}

export const updateStatus = async(userId: string, docId: string, status: boolean) => {
    let app: any = await getApp();
    if(!app) return;
    const db = getFirestore(app);
    let docRef = doc(db, "users", userId, 'todos', docId);
    await updateDoc(docRef, { complete: status});
}

export const deleteToDo = async (userId: string, docId: string) => {
    let app: any = await getApp();
    if(!app) return;
    const db = getFirestore(app);
    const docRef = doc(db, 'users', userId, 'todos', docId);
    await deleteDoc(docRef);
}

function getApp() {
    const firebaseConfig = {
        apiKey: "AIzaSyB-tJehHUATuAH1Ja5h_9tb4sM4nev-5IA",
        authDomain: "todo-nextjs-f4af2.firebaseapp.com",
        projectId: "todo-nextjs-f4af2",
        storageBucket: "todo-nextjs-f4af2.appspot.com",
        messagingSenderId: "592136812569",
        appId: "1:592136812569:web:61eb67b6ac6d7f22891288",
        measurementId: "G-RG6KZDSM04"
      };

    return new Promise((resolve, reject) => {
        try {
            //Initialize Firebase
            const app = initializeApp(firebaseConfig);
            resolve(app);
        } catch (error) {
            resolve(null);
        }
    })
}