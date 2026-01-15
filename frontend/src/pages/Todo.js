import API from "../services/api";
import { useEffect, useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Load tasks
  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Load tasks error:", err);
    }
  };

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await API.post(
        "/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTitle("");
      loadTasks();
    } catch (err) {
      console.error("Add task error:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      loadTasks();
    } catch (err) {
      console.error("Delete task error:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container">
      <h1>My Tasks</h1>

      <div className="task-input">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <span>{task.title}</span>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
