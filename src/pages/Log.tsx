import React, { Fragment, Dispatch, SetStateAction } from "react";
import { Alert, Button, ProgressBar, Table } from "react-bootstrap";
import { HistoryItem, Settings } from "../App";

function numberCompletedToday (history: Array<HistoryItem>) {
  return history.filter(hi => {
    const today = new Date().toLocaleDateString();
    return hi.completed.includes(today);
  }).length;
}

export function calculateGoalCompletionPercentage (dailyGoal: number, history: Array<HistoryItem>) {
  const completedToday = numberCompletedToday(history);

  return completedToday > dailyGoal ? 100 : ((completedToday / dailyGoal) * 100);
}

interface Props {
  history: Array<HistoryItem>,
  setHistory: Dispatch<SetStateAction<Array<HistoryItem>>>,
  settings: Settings
}

const Log = ({ history, setHistory, settings }: Props) => {

  function clearLog () {
    if(window.confirm('Are you sure that you want to clear the log?')) {
      setHistory([]);
    }
  }

  const rows = history.map((h, i) => {
    return (
      <tr key={i}>
        <td>{ h.timerMode }</td>
        <td>{ h.completed }</td>
        <th><input type="text" style={{ width: "100%" }} value={ h.notes } onChange={ (e) => setHistory(prevHistory => {
          return prevHistory.map((ph, i2) => i2 === i ? {...ph, notes: e.target.value} : ph)
        })}/></th>
      </tr>
    );
  });

  return (
    <Fragment>
      <h1>Log</h1>
      <Alert variant="info">
        Log entries are saved to this browser's local storage. When clearning browser data, log entries will be lost.
      </Alert>
      <label>Daily Goal Progress</label>
      <ProgressBar now={ calculateGoalCompletionPercentage(settings.dailyGoal, history) } />
       <output>{ numberCompletedToday(history) } / { settings.dailyGoal }</output>
      <h2 className="mt-3">Log Entries</h2>
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>Type</th>
          <th>Time Completed</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </Table>
    <Button onClick={ clearLog }>Clear Log</Button>
    </Fragment>
  );
}

export default Log;