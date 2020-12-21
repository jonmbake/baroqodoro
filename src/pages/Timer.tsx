import React, { Fragment, Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import AudioPlayer from '../components/AudioPlayer';
import { useTimer } from 'react-timer-hook';
import { HistoryItem } from '../App';

export enum TimerMode {
  Focus = 1500000,
  ShortBreak = 300000,
  LongBreak = 600000
}

export const historyStorageKey = 'baroqodoroLog';

interface Props {
  setHistory: Dispatch<SetStateAction<Array<HistoryItem>>>
}

const Main = ({ setHistory }: Props) => {
  const [timerMode, setTimerMode] = useState(TimerMode.Focus);
  const { minutes, seconds, pause, resume, restart, isRunning } = useTimer({ expiryTimestamp: Date.now() + TimerMode.Focus, onExpire: () => setHistory(h => h.concat(new HistoryItem(TimerMode[timerMode], new Date().toLocaleString(), ''))) })
  // A hack because react-timer-hook doesn't allow pause on init
  const [timerReady, setTimerReady] = useState(false);

  useEffect(() => {
    pause();
    setTimerReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onTimerModeClick (tm: TimerMode) {
    setTimerMode(tm);
    restart(Date.now() + tm.valueOf());
  }

  return (
    <Fragment>
      <Row className="justify-content-center">
        <ButtonGroup>
          <Button variant="outline-secondary" className={ timerMode === TimerMode.Focus ? 'active' : '' } onClick={ () => onTimerModeClick(TimerMode.Focus) }>Focus</Button>
          <Button variant="outline-secondary" className={ timerMode === TimerMode.ShortBreak ? 'active' : '' } onClick={ () => onTimerModeClick(TimerMode.ShortBreak) }>Short Break</Button>
          <Button variant="outline-secondary" className={ timerMode === TimerMode.LongBreak ? 'active' : '' } onClick={ () => onTimerModeClick(TimerMode.LongBreak) }>Long Break</Button>
        </ButtonGroup>
      </Row>
      <Row className="justify-content-center mt-5">
        <div className="timer text-monospace">{ minutes.toString().padStart(2, '0') }:{ seconds.toString().padStart(2, '0') }</div>
      </Row>
      <AudioPlayer timerMode={ timerMode } playTrack={ timerReady && isRunning } />
      <Row className="justify-content-center mt-5">
        <Col className="text-center" xs lg="2"><Button className="btn-xl" variant="primary" onClick={ () => minutes === 0 && seconds === 0 ? restart(Date.now() + timerMode.valueOf()) : resume() }>Start</Button></Col>
        <Col className="text-center" xs lg="2"><Button className="btn-xl" variant="warning" onClick={ pause }>Pause</Button></Col>
        <Col className="text-center" xs lg="2"><Button className="btn-xl" variant="danger" onClick={ () => restart(Date.now() + timerMode.valueOf()) }>Restart</Button></Col>
      </Row>
    </Fragment>
  )
}

export default Main;