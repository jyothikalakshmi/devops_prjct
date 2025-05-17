import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    // Sample starting tasks
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Set up backend", done: false },
  ]);
  const [newTask, setNewTask] = useState("");

  // Add new task
  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask.trim(),
      done: false,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask("");
  };

  // Toggle task done
  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1>Task Management App</h1>
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask} style={styles.button}>
          Add Task
        </button>
      </div>

      <ul style={styles.taskList}>
        {tasks.length === 0 && <li>No tasks yet!</li>}
        {tasks.map(({ id, text, done }) => (
          <li key={id} style={{ ...styles.task, textDecoration: done ? "line-through" : "none" }}>
            <input
              type="checkbox"
              checked={done}
              onChange={() => toggleDone(id)}
            />
            <span style={{ marginLeft: 8 }}>{text}</span>
            <button onClick={() => deleteTask(id)} style={styles.deleteBtn}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: "40px auto", fontFamily: "Arial, sans-serif" },
  inputRow: { display: "flex", marginBottom: 20 },
  input: { flex: 1, padding: 8, fontSize: 16 },
  button: { marginLeft: 8, padding: "8px 16px", fontSize: 16, cursor: "pointer" },
  taskList: { listStyle: "none", padding: 0 },
  task: { display: "flex", alignItems: "center", marginBottom: 10 },
  deleteBtn: { marginLeft: "auto", background: "red", color: "white", border: "none", cursor: "pointer", padding: "4px 8px" },
};

export default App;
