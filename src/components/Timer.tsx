import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';

export enum TimerState {
  Completed,
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
  setTimerState: Dispatch<SetStateAction<TimerState>>;
  timerState: TimerState;
  timerType: TimerType;
}

const Timer = (props: TimerProps) => {
  const { setTimerState, timerState, timerType } = props;
  const intervalId = useRef<number>();
  const prevTimerState = useRef<TimerState>();
  const [seconds, setSeconds] = useState(-1);

  function reset () {
    switch (timerType) {
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

  const resetOnTimerTypeChange = useCallback(reset, [timerType]);
  useEffect(resetOnTimerTypeChange, [resetOnTimerTypeChange]);

  useEffect(() => {
    switch (timerState) {
      case TimerState.Started:
        if (prevTimerState.current === TimerState.Completed) {
          reset();
        }
        intervalId.current = window.setInterval(() => {
          setSeconds(s => s <= 0 ? 0 : --s)
        }, 1000)
        break;
      case TimerState.Completed:
      case TimerState.Paused:
        clearInterval(intervalId.current);
        break;
      case TimerState.Reset:
        clearInterval(intervalId.current);
        // To Do - Refactor me because I am violating react-hooks/exhaustive-deps. After refactoring, remove the 'eslint-disable-next-line' below
        reset();
        break;
    }
    prevTimerState.current = timerState;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState]);

  function formatTime () {
    if (seconds <= 0) {
      return "00:00";
    }
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  const formatTimeOnSecondsChange = useCallback(formatTime, [seconds]);
  useEffect(() => {
    document.title = formatTimeOnSecondsChange() + ' - Baroqodoro';
  }, [formatTimeOnSecondsChange]);

  // Reset timer when seconds hit zero
  useEffect(() => {
   if (TimerState.Started && seconds === 0) {
     setSeconds(-1);
     setTimerState(TimerState.Completed);
   }
  }, [seconds, timerState, setTimerState]);

  return  (
    <Row className="justify-content-center mt-5">
      <div className="timer text-monospace">{ formatTime() }</div>
    </Row>
  );
}

export default Timer;