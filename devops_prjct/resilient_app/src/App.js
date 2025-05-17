import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/tasks"; // adjust if needed

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks=async()=>{
      const res=await fetch("http://localhost:5000/tasks");
      const data=await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  // const fetchTasks = async () => {
  //   try {
  //     const res = await fetch(API_URL);
  //     const data = await res.json();
  //     setTasks(data);
  //   } catch (err) {
  //     console.error("Error fetching tasks:", err);
  //   }
  // };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTask.trim() }),
      });

      const data = await res.json();
      setTasks((prev) => [...prev, data]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const toggleDone = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
      });

      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
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
        {tasks.map(({ _id, text, done }) => (
          <li key={_id} style={{ ...styles.task, textDecoration: done ? "line-through" : "none" }}>
            <input
              type="checkbox"
              checked={done}
              onChange={() => toggleDone(_id)}
            />
            <span style={{ marginLeft: 8 }}>{text}</span>
            <button onClick={() => deleteTask(_id)} style={styles.deleteBtn}>
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
