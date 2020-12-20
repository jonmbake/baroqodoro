import React, { Fragment, Dispatch, SetStateAction } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { HistoryItem } from "../App";

interface Props {
  history: Array<HistoryItem>,
  setHistory: Dispatch<SetStateAction<Array<HistoryItem>>>
}

const Log = ({ history, setHistory }: Props) => {

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