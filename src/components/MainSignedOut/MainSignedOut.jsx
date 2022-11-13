import React, { useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';
import audioClipMission from '../../assets/missioncomplete.mp3';
import audioClipMenu from '../../assets/menusound.mp3';
import Tasks from '../Tasks/Tasks';

const MainSignedOut = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [startMessage, setStartMessage] = useState(true);
  const [breakMessage, setBreakMessage] = useState(false);

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

  return (
    <div className="grid text-center align-center justify-center">
      <div className="mt-12">
        {startMessage && <p className="text-2xl">Press Start to Begin!</p>}
        {breakMessage && <p className="text-2xl">Break time!</p>}
      </div>
      <div className="flex text-center align-center justify-center">
        <div className="mt-8 w-[450px] h-[400px] rounded-md align-center justify-center bg-[#6D9886]">
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

export default MainSignedOut;
