import { useState } from "react";
import { TaskContext } from "./useTask";
import dayjs from "dayjs";

function TaskProvider({ children }) {
  const currentDate = dayjs().format("DD-MM-YYYY");

  const [allTasks, setAllTasks] = useState([]);
  const [allTasksLoading, setAllTasksLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskLoading, setTaskLoading] = useState(true);
  const [date, setDate] = useState(currentDate);

  return (
    <TaskContext.Provider
      value={{
        allTasks,
        setAllTasks,
        allTasksLoading,
        setAllTasksLoading,
        tasks,
        setTasks,
        taskLoading,
        setTaskLoading,
        date,
        setDate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
