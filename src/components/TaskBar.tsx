import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, FormControl, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { Check } from 'react-bootstrap-icons';
import useStateWithLocalStorage from "../util/storageState";

interface Props {
  isRunning: boolean
}

class Task {
  constructor(
    public description: string,
    public active: boolean = false,
    public completed: boolean = false
  ) {}
}

const TaskBar = ({ isRunning }: Props) => {
  const addTaskInputRef = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useStateWithLocalStorage<Array<Task>>('baroqodoroTasks', [], window.localStorage);
  const [showTaskList, setShowTaskList] = useState(false);

  let classes = "p-1 text-center lead alert";
  let message = "";
  if (isRunning) {
    classes = classes.concat(" alert-success");
    const focusTask = tasks.find(t => t.active)?.description || 'a task';
    message = `Focused on ${ focusTask }`;
  } else {
    classes = classes.concat(" alert-danger");
    message = 'Timer paused -- not focused';
  }

  useEffect(() => {
    addTaskInputRef.current && addTaskInputRef.current.focus();
  });

  const addTask = () => {
    const v = addTaskInputRef.current?.value;
    if (v == null || v?.trim() === '') {
      return;
    }
    setTasks(tasks => tasks.concat(new Task(v, tasks.length === 0)));
  }

  const markComplete = (e: React.MouseEvent<HTMLElement>, i: number) => {
    e.stopPropagation();
    setTasks(tasks => {
      const t = [...tasks];
      t[i].completed = true;
      return t;
    });
  }

  const markActive = (index: number) => {
    setTasks(tasks => tasks.map((t, i) => {
      if (i === index) {
        t.active = true;
      } else {
        t.active = false;
      }
      return t;
    }));
  }

  const clearCompleted = () => {
    setTasks(tasks => tasks.filter(t => !t.completed))

  }

  const taskList = tasks.map((t, i) => {
    return (
      <ListGroup.Item className={ t.completed ? 'completed-task' : '' } active={ t.active } onClick={ () => markActive(i) } key={ i }>{ t.description } <button type="button" className="close" onClick={ (e) => markComplete(e, i) }><span aria-hidden="true"><Check/></span><span className="sr-only">Complete</span></button></ListGroup.Item>
    );
  });

  return (
    <Fragment>
      <div className={ classes }>
        { message } <a href="#" className="alert-link" onClick={ () => setShowTaskList(true)}>Edit tasks</a>
      </div>
      <Modal show={ showTaskList } onHide={ () => setShowTaskList(false) }>
        <Modal.Header closeButton>
          <Modal.Title>Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>What tasks would you lke to complete today?</p>
        <ListGroup className="task-list">
          { taskList }
          <ListGroup.Item key={ taskList.length }>
            <InputGroup>
              <FormControl autoFocus={ true } placeholder="Task description" aria-label="Task description" ref={ addTaskInputRef } />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={ addTask }>Add</Button>
              </InputGroup.Append>
            </InputGroup> 
          </ListGroup.Item>
        </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={ clearCompleted }>Clear Completed</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>

  )
}

export default TaskBar;