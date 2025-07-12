import { PieChartComponent, BarChartComponent, SpinnerLoading } from "./";
import Tables from "./Table";
import { useTask } from "../context/taskContext/useTask";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function Dashboard() {
  const { allTasks, allTasksLoading, tasks, tasksLoading, date } = useTask();

  const currentDate = dayjs().format("DD-MM-YYYY");
  dayjs.extend(customParseFormat);

  // Filter tasks foa a day by status
  const completedTasks =
    tasks?.filter((task) => task.status?.toLowerCase() === "completed") || [];
  const inProgressTasks =
    tasks?.filter((task) => task.status?.toLowerCase() === "in-progress") || [];
  const pendingTasks =
    tasks?.filter((task) => task.status?.toLowerCase() === "pending") || [];

  // Filter tasks foa a day by status
  const completedAllTasks =
    allTasks?.filter((task) => task.status?.toLowerCase() === "completed") ||
    [];
  const inProgressAllTasks =
    allTasks?.filter((task) => task.status?.toLowerCase() === "in-progress") ||
    [];
  const pendingAllTasks =
    allTasks?.filter((task) => task.status?.toLowerCase() === "pending") || [];

  // Prepare day's data for pie chart
  const pieChartDataForDay = [
    { name: "Completed", value: completedTasks.length, color: "#5CE65C" },
    { name: "In Progress", value: inProgressTasks.length, color: "#305CDE" },
    { name: "Pending", value: pendingTasks.length, color: "#EF4444" },
  ];

  //Prepare all days data for pie chart
  const pieChartAllData = [
    { name: "Completed", value: completedAllTasks.length, color: "#5CE65C" },
    {
      name: "In Progress",
      value: inProgressAllTasks.length,
      color: "#305CDE",
    },
    { name: "Pending", value: pendingAllTasks.length, color: "#EF4444" },
  ];

  // Prepare data for bar chart by category
  const prepareBarChartData = (tasksList) => {
    const categoryData = {};

    tasksList?.forEach((task) => {
      const category = task.category || "Uncategorized";
      if (!categoryData[category]) {
        categoryData[category] = {
          category: category,
          completed: 0,
          inProgress: 0,
          pending: 0,
        };
      }

      const status = task.status?.toLowerCase();
      if (status === "completed") {
        categoryData[category].completed++;
      } else if (status === "in-progress") {
        categoryData[category].inProgress++;
      } else if (status === "pending") {
        categoryData[category].pending++;
      }
    });

    return Object.values(categoryData);
  };

  // const barChartDataForDay = prepareBarChartData(tasks);
  const barChartAllData = prepareBarChartData(allTasks);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      {/* Main container with responsive sidebar margin */}
      <div className="ml-0 sm:ml-52 md:ml-56 lg:ml-64 xl:ml-64 pt-16 sm:pt-20 px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 md:py-8">
          {allTasksLoading && tasksLoading ? (
            <>
              <SpinnerLoading />
            </>
          ) : (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold mb-2 animate-in slide-in-from-top duration-500">
                  {currentDate === date
                    ? `Today's Stats`
                    : `${dayjs(date, "DD-MM-YYYY").format(
                        `DD MMMM, YYYY`
                      )}'s Stats`}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
              </div>

              {/* Pie Chart Section */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border border-white/20 animate-in slide-in-from-bottom delay-150">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3 animate-pulse"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-700 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text">
                    Task Status Overview
                  </h2>
                </div>
                <div className="transform group-hover:scale-105 transition-transform duration-300">
                  <PieChartComponent pieChartData={pieChartDataForDay} />
                </div>
              </div>

              {/* Task Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Completed Tasks */}
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 border border-white/20 hover:border-green-200 animate-in slide-in-from-left delay-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg"></div>
                      <h3 className="text-lg sm:text-xl font-bold text-green-700">
                        Completed Tasks
                      </h3>
                    </div>
                    <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm font-bold px-3 py-1.5 rounded-full shadow-sm ring-2 ring-green-100 transform group-hover:scale-110 transition-transform duration-200">
                      {completedTasks.length}
                    </span>
                  </div>
                  <div className="max-h-48 sm:max-h-64 overflow-y-auto">
                    {completedTasks.length > 0 ? (
                      <Tables
                        cells={["Title", "Category"]}
                        tasks={completedTasks}
                      />
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500 text-sm sm:text-base font-medium">
                          No completed tasks
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* In Progress Tasks */}
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 border border-white/20 hover:border-blue-200 animate-in slide-in-from-bottom delay-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg animate-pulse"></div>
                      <h3 className="text-lg sm:text-xl font-bold text-blue-700">
                        In Progress Tasks
                      </h3>
                    </div>
                    <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm font-bold px-3 py-1.5 rounded-full shadow-sm ring-2 ring-blue-100 transform group-hover:scale-110 transition-transform duration-200">
                      {inProgressTasks.length}
                    </span>
                  </div>
                  <div className="max-h-48 sm:max-h-64 overflow-y-auto">
                    {inProgressTasks.length > 0 ? (
                      <Tables
                        cells={["Title", "Category"]}
                        tasks={inProgressTasks}
                      />
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500 text-sm sm:text-base font-medium">
                          No in progress tasks
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pending Tasks */}
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 md:col-span-2 lg:col-span-1 border border-white/20 hover:border-red-200 animate-in slide-in-from-right delay-400">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg"></div>
                      <h3 className="text-lg sm:text-xl font-bold text-red-700">
                        Pending Tasks
                      </h3>
                    </div>
                    <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 text-sm font-bold px-3 py-1.5 rounded-full shadow-sm ring-2 ring-red-100 transform group-hover:scale-110 transition-transform duration-200">
                      {pendingTasks.length}
                    </span>
                  </div>
                  <div className="max-h-48 sm:max-h-64 overflow-y-auto">
                    {pendingTasks.length > 0 ? (
                      <Tables
                        cells={["Title", "Category"]}
                        tasks={pendingTasks}
                      />
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-6 h-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500 text-sm sm:text-base font-medium">
                          No pending tasks
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* History Section */}
              <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 animate-in slide-in-from-bottom duration-700 delay-500">
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-bold mb-2">
                    History
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
                </div>

                {/* History Chart */}
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full mr-3 animate-pulse"></div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-700 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text">
                      Historical Task Status
                    </h2>
                  </div>
                  <div className="transform group-hover:scale-105 transition-transform duration-300">
                    <PieChartComponent pieChartData={pieChartAllData} />
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mr-3 animate-pulse"></div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-700 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text">
                      All Tasks by Category
                    </h2>
                  </div>
                  <div className="transform group-hover:scale-105 transition-transform duration-300">
                    <BarChartComponent barChartData={barChartAllData} />
                  </div>
                </div>

                {/* All Tasks Table */}
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mr-3"></div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-700 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text">
                      All Tasks
                    </h2>
                  </div>
                  <div className="max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto overflow-x-auto">
                    <Tables
                      cells={["Date", "Title", "Category", "Status"]}
                      tasks={allTasks}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
