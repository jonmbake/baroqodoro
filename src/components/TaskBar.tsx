import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import { Button, FormControl, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { Check, Pencil } from 'react-bootstrap-icons';
import useStateWithLocalStorage from "../util/storageState";

interface Props {
  isRunning: boolean
}

class Task {
  constructor(
    public description: string,
    public active: boolean = false,
    public completed: boolean = false,
    public editing: boolean = false
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
    message = `Focused on '${ focusTask }'`;
  } else {
    classes = classes.concat(" alert-danger");
    message = 'Timer paused -- not focused';
  }

  useEffect(() => {
    tasks.findIndex(t => t.editing) === -1 && addTaskInputRef.current && addTaskInputRef.current.focus();
  });

  const addTask = () => {
    const v = addTaskInputRef.current?.value;
    if (v == null || v?.trim() === '') {
      return;
    }
    setTasks(tasks => tasks.concat(new Task(v, tasks.length === 0)).sort((t1, t2) => t1.description > t2.description ? 1 : -1));
  }

  const saveTask = () => {
    setTasks(tasks => tasks.map(t => {
      t.editing = false;
      return t;
    }));

  }

  const editTask = (e: React.MouseEvent<HTMLElement>, itemIndex: number) => {
    e.stopPropagation();
    setTasks(tasks => tasks.map((t, i) => {
      t.editing = i === itemIndex;
      return t;
    }));
  };

  const toggleCompleted = (e: React.MouseEvent<HTMLElement>, itemIndex: number) => {
    e.stopPropagation();
    setTasks(tasks => {
      const ts = [...tasks];
      const t = {...ts[itemIndex]};
      t.completed = !t.completed;
      ts[itemIndex] = t;
      return ts;
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

  const updateTaskDescription = (index: number) => (e: ChangeEvent<any>) => {
    setTasks(tasks => {
      return tasks.map((t, i) => {
        if (i === index) {
          t.description = e.target.value;
        }
        return t;
      })
    })
  }

  const taskList = tasks.map((t, i) => {
    if (t.editing) {
      return (
        <ListGroup.Item active={ t.active } key={ i } >
        <InputGroup className="mb-3">
          <FormControl value={ t.description } autoFocus={ true } onChange={ updateTaskDescription(i) } onKeyPress={(event: React.KeyboardEvent) => event.key === 'Enter' ? saveTask() : '' } />
          <InputGroup.Append>
            <Button variant="light" onClick={ saveTask }>Save</Button>
          </InputGroup.Append>
        </InputGroup>
      </ListGroup.Item>
      );
    }
    return (
      <ListGroup.Item className={ t.completed ? 'completed-task' : '' } active={ t.active } onClick={ () => markActive(i) } key={ i }>
        { t.description }
        <button type="button" className="close" title="Toggle Complete" onClick={ (e) => toggleCompleted(e, i) }><span aria-hidden="true"><Check/></span><span className="sr-only">Toggle Complete</span></button>&nbsp;
        <button type="button" className="close" title="Edit" onClick={ (e) => editTask(e, i) }><span aria-hidden="true"><Pencil/></span><span className="sr-only">Edit Task</span></button>&nbsp;
      </ListGroup.Item>
    );
  });

  return (
    <Fragment>
      <div className={ classes }>
        { message } <a href="#" className="alert-link" onClick={ () => setShowTaskList(true)}>Edit tasks</a>
      </div>
      <Modal size="lg" show={ showTaskList } onHide={ () => setShowTaskList(false) } animation={ false } >
        <Modal.Header closeButton>
          <Modal.Title>Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>What tasks would you lke to complete today?</p>
        <ListGroup className="task-list">
          { taskList }
          <ListGroup.Item key={ taskList.length }>
            <InputGroup>
              <FormControl placeholder="Task description" aria-label="Task description" ref={ addTaskInputRef } onKeyPress={(event: React.KeyboardEvent) => event.key === 'Enter' ? addTask() : '' } />
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