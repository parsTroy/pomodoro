import { clear } from '@testing-library/user-event/dist/clear';
import React, { useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';
import audioClipMission from '../../assets/missioncomplete.mp3';
import audioClipMenu from '../../assets/menusound.mp3';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from '../Todo/Todo';
import { db } from '../../utils/firebase';
import {
    query,
    collection,
    onSnapshot,
    querySnapshot,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
} from 'firebase/firestore';

const Main = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [startMessage, setStartMessage] = useState(true);
    const [breakMessage, setBreakMessage] = useState(false);

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    // const [shortBreak, setShortBreak] = useState(5);
    // const [longBreak, setLongBreak] = useState(15);

    const start = () => {
        setStartMessage(false);
        setSeconds(59);
        setMinutes(24);
        startSound();
    };

    const startSound = () => {
        const sound = new Howl({
            src: audioClipMenu,
            html5: true,
        });
        sound.play();
        Howler.volume(0.2);
    };

    const alarmSound = () => {
        const sound = new Howl({
            src: audioClipMission,
            html5: true,
        });
        sound.play();
        Howler.volume(0.2);
    };

    useEffect(() => {
        if (startMessage === false) {
            let interval = setInterval(() => {
                clearInterval(interval);
                if (seconds === 0) {
                    if (minutes !== 0) {
                        setSeconds(59);
                        setMinutes(minutes - 1);
                    } else {
                        let minutes = breakMessage ? 24 : 4;
                        let seconds = 59;

                        setSeconds(seconds);
                        setMinutes(minutes);
                        setBreakMessage(!breakMessage);
                        alarmSound();
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else if (breakMessage) {
            alarmSound();
        } else {
            return;
        }
    }, [seconds]);

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // Create Todo
    const createTodo = async (event) => {
        event.preventDefault(event);
        if (!input) {
            alert('Please Enter a Valid Task Item');
            return;
        }
        await addDoc(collection(db, 'todos'), {
            text: input,
            completed: false,
        });
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
        <div className="grid text-center align-center justify-center">
            <div className="w-100 mt-20 align-center justify-center">
                {startMessage && (
                    <p className="text-2xl">Press Start to Begin!</p>
                )}
                {breakMessage && <p className="text-2xl">Break time!</p>}
            </div>
            <div className="flex text-center align-center justify-center">
                <div className="mt-12 w-[450px] h-[400px] rounded-md align-center justify-center bg-[#6D9886]">
                    {/* <div className="flex justify-center bg-[#6D9886] rounded-md">
                        <button className="w-32 h-12 rounded-md bg-greenTran-950 p-3 m-2 mt-8">
                            Short
                        </button>
                        <button className="w-32 h-12 rounded-md bg-greenTran-950 p-3 m-2 mt-8">
                            Long
                        </button>
                    </div> */}
                    <div className="mt-24">
                        <div className="flex justify-center mt-10">
                            <p className="text-6xl">
                                {timerMinutes}:{timerSeconds}
                            </p>
                        </div>
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={start}
                                className="text-2xl text-[#6D9886] w-40 h-16 rounded-md bg-[#f7f7f7] p-4"
                            >
                                START
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex text-center align-center justify-center">
                <div className="mt-10 bg-[#6D9886] w-[450px] min-h-[300px] rounded-md pb-4">
                    <div className="mt-10 px-8">
                        <h1 className="text-2xl mb-4 font-bold">Tasks</h1>
                        <form
                            onSubmit={createTodo}
                            className="flex justify-between mb-4"
                        >
                            <input
                                className="rounded-md w-full p-2 mr-4 text-[#393e46]"
                                value={input}
                                onChange={(event) =>
                                    setInput(event.target.value)
                                }
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
                            <p className="p-2 mb-2">
                                Add a Task to Your List...
                            </p>
                        ) : (
                            <p className="p-2 mt-4 mb-2">{`You have ${todos.length} tasks.`}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
