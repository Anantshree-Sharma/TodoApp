import { createContext, useContext } from "react";

const TaskContext = createContext();

const useTask = () => useContext(TaskContext);

export { TaskContext, useTask };
