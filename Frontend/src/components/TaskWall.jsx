import { useTask } from "../context/taskContext/useTask";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function TaskWall() {
  dayjs.extend(customParseFormat);
  const currentDate = dayjs().format("DD-MM-YYYY");
  const { tasks, taskLoading, date, setDate } = useTask();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8 ml-0 sm:ml-52 md:ml-56 lg:ml-64 xl:ml-64 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {taskLoading ? (
          <div className="grid grid-cols-1 my-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 md:gap-12 justify-items-center max-w-7xl mx-auto">
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
            <div className="flex items-center justify-center my-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Pick Date"
                  value={dayjs(date, "DD-MM-YYYY")}
                  maxDate={dayjs()}
                  format="DD MMMM, YYYY"
                  onChange={(newValue) => {
                    const formatted = newValue?.format("DD-MM-YYYY");
                    setDate(formatted);
                  }}
                />
              </LocalizationProvider>
            </div>
            <p className="text-center text-gray-600 mb-10 text-2xl">
              {currentDate === date
                ? `Todays's Tasks`
                : `${dayjs(date, "DD-MM-YYYY").format("DD MMMM, YYYY")} Tasks`}
            </p>
            {tasks.length === 0 && (
              <p className="text-center text-2xl text-gray-300">
                No tasks for {date}.
              </p>
            )}
            {tasks.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 md:gap-12 justify-items-center max-w-7xl mx-auto">
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
