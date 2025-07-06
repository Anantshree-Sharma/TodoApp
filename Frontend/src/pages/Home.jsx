import { Outlet } from "react-router-dom";
import { NavBar } from "../components";
import TaskProvider from "../context/taskContext/TaskProvider";

const Home = () => {
  return (
    <TaskProvider>
      <NavBar />
      <Outlet />
    </TaskProvider>
  );
};

export default Home;
