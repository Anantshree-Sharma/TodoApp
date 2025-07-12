import { NavLink } from "react-router-dom";
import {
  ChartBarIcon,
  PlusIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

function NavBar() {
  const navItems = [
    {
      id: "task-wall",
      label: "Task Wall",
      icon: <ClipboardIcon className="w-5 h-5" />,
      path: "/home",
    },
    {
      id: "add-task",
      label: "Add Task",
      icon: <PlusIcon className="w-5 h-5" />,
      path: "/home/add-task",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <ChartBarIcon className="w-5 h-5" />,
      path: "/home/dashboard",
    },
  ];

  return (
    <>
      {/* Desktop Navigation - Left Side */}
      <div className="hidden md:block fixed  h-[calc(100%-31.9875px)] z-50 sm:block w-48 sm:w-52 md:w-56 lg:w-64 xl:w-64 2xl:72">
        <nav className="bg-white shadow-lg h-full bg-gradient-to-b to-purple-50 via-blue-100 from-purple-200 p-4 rounded-r-3xl">
          <div className="flex flex-col space-y-4 mt-8">
            {navItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.id}
                end
                className={({ isActive }) =>
                  `px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Navigation - Bottom Tab Bar */}
      <div className="md:hidden bg-white border-t border-gray-200 shadow-2xl">
        <nav className="flex justify-around items-center py-2 px-4 max-w-sm mx-auto">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              end
              key={item.id}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-500 hover:text-purple-600"
                }`
              }
            >
              {item.icon}
              <span className="text-xs font-medium truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Padding - to prevent content from being hidden behind bottom nav */}
      <div className="md:hidden h-20"></div>
    </>
  );
}

export default NavBar;
