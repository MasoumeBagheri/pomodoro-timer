import React from "react";

const pomodoroCount = (props) => (
  <div>
    <span>
      {props.minutes === 25 && props.counter === 0
        ? 0
        : props.status === "Focus"
        ? props.counter + 1
        : props.counter}
    </span>
    /4
    <span>({props.completePomodoroCount})</span>
  </div>
);

export default pomodoroCount;
