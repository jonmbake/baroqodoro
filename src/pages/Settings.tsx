import React, { Fragment, Dispatch, SetStateAction } from "react";
import { Alert, Form } from "react-bootstrap";
import { Settings } from "../App";

export const goalStorageKey = 'baroqodoroGoal';

interface Props {
  settings: Settings,
  setSettings: Dispatch<SetStateAction<Settings>>
}

const SettingsPage = ({ settings, setSettings }: Props) => {
  return (
    <Fragment>
      <h1>Settings</h1>
      <Alert variant="info">
        Settings are saved to this browser's local storage. When clearning browser data, settings will be lost.
      </Alert>
      <Form className="mt-3">
        <Form.Group controlId="dailySessionGoal">
          <Form.Label>Daily Focus Session Goal</Form.Label>
          <Form.Control type="range" min="1" max="20" step="1" value={ settings.dailyGoal } onChange={ (e) => setSettings(new Settings((parseInt(e.target.value)))) }/>
          <output>{ settings.dailyGoal }</output>
          <Form.Text className="text-muted">
            Goal for how many Focus Sessions you wish to complete each day.
          </Form.Text>
        </Form.Group>
      </Form>
    </Fragment>
  );
}

export default SettingsPage;