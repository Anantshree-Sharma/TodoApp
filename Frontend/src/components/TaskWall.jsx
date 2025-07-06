import { useEffect, useState } from "react";
import { useTask } from "../context/taskContext/useTask";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SpinnerLoading from "./SpinnerLoading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TaskWall() {
  const { tasks, setTasks } = useTask();
  const [loading, setLoading] = useState(true);

  const stickyColors = [
    "bg-yellow-200 border-yellow-300",
    "bg-pink-200 border-pink-300",
    "bg-blue-200 border-blue-300",
    "bg-green-200 border-green-300",
    "bg-purple-200 border-purple-300",
    "bg-orange-200 border-orange-300",
    "bg-red-200 border-red-300",
    "bg-indigo-200 border-indigo-300",
    "bg-teal-200 border-teal-300",
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      try {
        const res = await fetch(`${BASE_URL}/task/all`, {
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
          setLoading(false);
        }, 1000);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 justify-items-center max-w-7xl mx-auto">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonTheme
                key={index}
                baseColor="#e5e7eb"
                highlightColor="#f3f4f6"
              >
                <div
                  className={`${
                    stickyColors[index % stickyColors.length]
                  } p-4 rounded-lg border-2 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer group relative flex flex-col justify-between w-80 min-h-fit md:w-60 lg:w-60 xl:w-76`}
                  style={{
                    transform: `rotate(${
                      (index % 2 === 0 ? 1 : -1) * (0.3 + (index % 3) * 0.2)
                    }deg)`,
                  }}
                >
                  <Skeleton height={20} width={100} className="mb-5" />
                  {/* image placeholder */}
                  <Skeleton height={20} width="100%" /> {/* title */}
                  <Skeleton height={20} width="100%" /> {/* title */}
                  <Skeleton height={15} width="60%" /> {/* subtitle */}
                </div>
              </SkeletonTheme>
            ))}
          </div>
        ) : (
          <>
            {/* Tasks Grid */}
            {tasks.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 justify-items-center max-w-7xl mx-auto">
                {tasks.map((task, index) => (
                  <Link
                    to={`/home/task/${task._id}`}
                    key={task._id}
                    className={`${
                      stickyColors[index % stickyColors.length]
                    } p-4 rounded-lg border-2 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer group relative flex flex-col justify-between w-80 min-h-fit md:w-60 lg:w-60 xl:w-76`}
                    style={{
                      transform: `rotate(${
                        (index % 2 === 0 ? 1 : -1) * (0.3 + (index % 3) * 0.2)
                      }deg)`,
                    }}
                  >
                    {/* Sticky note tape effect */}
                    <div className="absolute -top-2 left-4 w-8 h-4 bg-yellow-400 opacity-70 rounded-sm transform -rotate-45 shadow-sm"></div>

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-2 text-sm group-hover:text-gray-900 leading-tight">
                        {task.title}
                      </h3>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TaskWall;
