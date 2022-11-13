import { clear } from '@testing-library/user-event/dist/clear';
import React, { useEffect, useState } from 'react';

const Main = () => {
    const [minutes, setMinutes] = useState(24);
    const [seconds, setSeconds] = useState(59);
    const [startMessage, setStartMessage] = useState(true);
    const [breakMessage, setBreakMessage] = useState(false);

    const [shortBreak, setShortBreak] = useState(5);
    const [longBreak, setLongBreak] = useState(15);

    const start = () => {
        setStartMessage(false);
    };

    useEffect(() => {
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
                }
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);
    }, [seconds]);

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <div className="grid text-center align-center justify-center">
            <div className="w-[100vw] mt-20 align-center justify-center">
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
        </div>
    );
};

export default Main;
