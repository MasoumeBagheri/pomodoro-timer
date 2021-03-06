import React, { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeOff } from "react-icons/fa";

const alarmAudio = require("../../assets/sounds/Arcadia.mp3");

const PomodoroSound = (props) => {
  const [isPouseAudio, setIsPouseAudio] = useState(true);

  const pouseAudioHandler = () => {
    setIsPouseAudio(!isPouseAudio);
  };
  return (
    <div>
      {props.minutes === 0 && props.seconds === 0 && isPouseAudio === true ? (
        <audio src={alarmAudio} autoPlay />
      ) : null}

      <div style={{ fontSize: "50px" }} onClick={pouseAudioHandler}>
        {isPouseAudio ? <FaVolumeUp /> : <FaVolumeOff />}
      </div>
    </div>
  );
};

export default PomodoroSound;
