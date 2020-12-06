import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const { timerState, timerType } = props;
  const intervalId = useRef<number>();
  const [seconds, setSeconds] = useState(0);

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
        intervalId.current = window.setInterval(() => {
          setSeconds(s => s <= 0 ? 0 : --s)
        }, 1000)
        break;
      case TimerState.Paused:
        clearInterval(intervalId.current);
        break;
      case TimerState.Reset:
        clearInterval(intervalId.current);
        // To Do - Refactor me because I am violating react-hooks/exhaustive-deps. After refactoring, remove the 'eslint-disable-next-line' below
        reset();
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState]);

  function formatTime () {
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
   if (seconds === 0) {
    clearInterval(intervalId.current);
    resetOnTimerTypeChange();
   }
  }, [seconds, resetOnTimerTypeChange]);

  return  (
    <Row className="justify-content-center mt-5">
      <div className="timer text-monospace">{ formatTime() }</div>
    </Row>
  );
}

export default Timer;