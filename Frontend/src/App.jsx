import { useEffect } from "react";
import "./App.css";
import {
  AddTask,
  EditTask,
  Footer,
  Header,
  Protected,
  TaskWall,
} from "./components";
import { About, Login, Signup, Start, Home } from "./pages";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./context/userContext/useUser";
import { SpinnerLoading } from "./components";

function App() {
  const { isAuth, setIsAuth, setUser, loading, setLoading } = useUser();
  const navigate = useNavigate();
  const loaction = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const prevPath = sessionStorage.getItem("prevPath");

      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;

        const res = await fetch(`${BASE_URL}/user/profile`, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();

        if (result.error) {
          setUser(null);
          setIsAuth(false);
          navigate(prevPath);
          return;
        }
        setUser(result);
        setIsAuth(true);
        if (prevPath === "/login") {
          navigate("/home");
        } else {
          navigate(prevPath);
        }
      } catch (error) {
        console.error("❌ Network or fetch error:", error);
        setUser(null);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isAuth]);

  useEffect(() => {
    sessionStorage.setItem("prevPath", location.pathname);
  }, [loaction.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full">
        {loading ? (
          <>
            <SpinnerLoading />
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route
                path="/home/*"
                element={
                  <Protected>
                    <Home />
                  </Protected>
                }
              >
                <Route path="dashboard" element={<h1>Dash</h1>} />
                <Route path="add-task" element={<AddTask />} />
                <Route path="task-wall" element={<TaskWall />} />
                <Route path="task/:id" element={<EditTask />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
