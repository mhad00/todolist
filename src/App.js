import logo from "./logo.svg";
import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./component/home/Home";
// import All from "./component/all/All";
// import Active from "./component/active/Active";
// import Completed from "./component/completed/Completed";
import { useState, useEffect } from "react";
import { FaCheck, FaUndoAlt, FaTrash } from "react-icons/fa";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([
    { id: 1, task: "todo1", completed: true },
    { id: 2, task: "todo2", completed: false },
    { id: 3, task: "todo3", completed: false },
  ]);

  const [listToggle, setListToggle] = useState("all");

  const addTask = () => {
    if (task !== "") {
      let num = list.length + 1;
      setList([...list, { id: num, task: task, completed: false }]);
      setTask("");
    }
  };

  const completeTask = (id) => {
    const updatedList = list.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setList(updatedList);
  };

  const deleteTask = (id) => {
    const updatedList = list.filter((task) => task.id !== id);
    setList(updatedList);
  };

  const deleteAllCompletedTasks = () => {
    const updatedList = list.filter((task) => !task.completed);
    setList(updatedList);
  };

  const listType = (type) => {
    setListToggle(type);
  };

  const showList = list.filter((task) =>
    listToggle === "active"
      ? !task.completed
      : listToggle === "completed"
      ? task.completed
      : true
  );

  return (
    <div className="App">
      <div className="home">
        <h1>TODOLIST</h1>

        <div className="form">
          <input
            className="inputTask"
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="link">
          <button
            className="linkbtn"
            onClick={() => {
              listType("all");
            }}
          >
            All
          </button>
          <button
            className="linkbtn"
            onClick={() => {
              listType("active");
            }}
          >
            Active
          </button>
          <button
            className="linkbtn"
            onClick={() => {
              listType("completed");
            }}
          >
            Completed
          </button>
        </div>
        <div className="taskList">
          {showList.map((task) => (
            <div className="div-task" key={task.id}>
              <p style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}>{task.task}</p>
              <div className="task-btn">
                <button className="completebtn" onClick={() => completeTask(task.id)}>
                  {task.completed ? <span><FaUndoAlt size={16} color="blue"/> UNDO</span>: <span> <FaCheck size={16} color="green" /> COMPLETE</span>}
                </button>
                <button className="deletebtn" onClick={() => deleteTask(task.id)}> <FaTrash size={16} color="red"/>Delete</button>
              </div>
            </div>
          ))}
          {listToggle === "completed" && (
            <div className="deleteAll">
              <button className="deleteallbtn" onClick={deleteAllCompletedTasks}>
                <FaTrash size={16} color="red"/>
                Delete All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
