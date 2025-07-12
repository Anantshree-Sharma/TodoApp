import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components";
import { toast } from "react-toastify";
import { useTask } from "../context/taskContext/useTask";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Home = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const location = useLocation();

  const { setAllTasks, setTasks, setAllTasksLoading, setTaskLoading, date } =
    useTask();

  //Fetch Tasks by date
  useEffect(() => {
    const fetchTasks = async () => {
      setTaskLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/task/search?date=${date}`, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        if (result.error) {
          toast.error(result.error);
        }
        setTasks(result);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setTaskLoading(false);
        }, 1000);
      }
    };

    fetchTasks();
  }, [date, location.pathname]);

  //Fetch users All task
  useEffect(() => {
    const fetchAllTasks = async () => {
      setAllTasksLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/task/all`, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        if (result.error) {
          toast.error(result.error);
          navigate("/home");
          return;
        }
        setAllTasks(result);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setTimeout(() => {
          setAllTasksLoading(false);
        }, 1000);
      }
    };

    fetchAllTasks();
  }, [location.pathname]);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Home;
