import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from '../Todo/Todo';
import { auth, db } from '../../utils/firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

const Tasks = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Create Todo
  const createTodo = async (event) => {
    event.preventDefault(event);
    if (!input) {
      alert('Please Enter a Valid Task Item');
      return;
    }
    if (auth.currentUser) {
      await addDoc(collection(db, 'todos'), {
        text: input,
        completed: false,
      });
    }
    setInput('');
  };

  // Read Todo from Firebase
  useEffect(() => {
    const dataQuery = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(dataQuery, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsubscribe();
  }, []);

  // Update Todo in Firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className="flex pb-10 text-center align-center justify-center">
      <div className="mt-10 bg-[#6D9886] w-[450px] min-h-[240px] rounded-md pb-4">
        <div className="mt-10 px-8">
          <h1 className="text-2xl mb-4 font-bold">Tasks</h1>
          <form onSubmit={createTodo} className="flex justify-between mb-4">
            <input
              className="rounded-md w-full p-2 mr-4 text-[#393e46]"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              type="text"
              placeholder="Task Item..."
            />
            <button className="border rounded-md p-2 bg-[#393e46]">
              <AiOutlinePlus size={30} />
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
          {todos.length < 1 ? (
            <p className="p-2 mb-2">Add a Task to Your List...</p>
          ) : (
            <p className="p-2 mt-4 mb-2">{`You have ${todos.length} task(s).`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
