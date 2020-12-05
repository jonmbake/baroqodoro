import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';

export enum TimerState {
  Started,
  Paused,
  Reset
}

export enum TimerType {
  Focus,
  ShortBreak,
  LongBreak
}

interface TimerProps {
  timerState: TimerState;
  timerType: TimerType;
}

const Timer = (props: TimerProps) => {
  const [intervalId, setIntervalId] = useState<number>();
  const [seconds, setSeconds] = useState(0);

  function reset () {
    switch (props.timerType) {
      case TimerType.Focus:
        setSeconds(1500);
        break;
      case TimerType.ShortBreak:
        setSeconds(300);
        break;
      case TimerType.LongBreak:
        setSeconds(900);
        break;
    }
  }

  useEffect(() => reset(), [props.timerType]);

  useEffect(() => {
    switch (props.timerState) {
      case TimerState.Started:
        setIntervalId(window.setInterval(() => {
          setSeconds(s => s <= 0 ? 0 : --s)
        }, 1000));
        break;
      case TimerState.Paused:
        clearInterval(intervalId);
        break;
      case TimerState.Reset:
        clearInterval(intervalId);
        reset();
        break;
    }
  }, [props.timerState]);

  useEffect(() => {
    document.title = formattedTime() + ' - Baroqodoro';
    if (seconds === 0) {
      clearInterval(intervalId);
    }
  }, [seconds])

  function formattedTime () {
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  return  (
    <Row className="justify-content-center mt-5">
      <div className="timer text-monospace">{ formattedTime() }</div>
    </Row>
  );
}

export default Timer;