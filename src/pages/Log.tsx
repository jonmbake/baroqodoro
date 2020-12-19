import React, { Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import useStateWithLocalStorage from "../util/storageState";
import { HistoryItem, historyStorageKey } from "./Main";

const Log = () => {
  const [history, setHistory] = useStateWithLocalStorage<Array<HistoryItem>>(historyStorageKey, [], window.localStorage);

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
      </tr>
    );
  });

  return (
    <Fragment>
      <h1>Log</h1>
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>Type</th>
          <th>Time Completed</th>
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