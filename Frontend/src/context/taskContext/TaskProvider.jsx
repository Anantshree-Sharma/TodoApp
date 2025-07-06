import { useState } from "react";
import { TaskContext } from "./useTask";

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [taskLoading, setTaskLoading] = useState(true);

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, taskLoading, setTaskLoading }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
