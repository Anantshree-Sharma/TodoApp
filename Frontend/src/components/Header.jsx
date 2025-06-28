import { NavLink, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useUser } from "../context/userContext/useUser";
import { toast } from "react-toastify";
import Logo from "./Logo";

function Header() {
  const [showNav, setShowNav] = useState(false);
  const { isAuth, setIsAuth, setUser } = useUser();
  const navigate = useNavigate();
  const navLinks = isAuth
    ? [
        { name: "Home", to: "/home" },
        { name: "About", to: "/about" },
        { name: "Logout" },
      ]
    : [
        { name: "Home", to: "/" },
        { name: "About", to: "/about" },
        { name: "Login", to: "/login" },
        { name: "Signup", to: "/signup" },
      ];

  const handleLogout = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const res = await fetch(`${BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      const result = res.json();

      if (result.error) {
        toast.error(result.error);
      }
      setUser(null);
      setIsAuth(false);
      toast.info(result.msg);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="w-ful border-b-2 border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <Logo width={10} height={10} text="2xl" />
        {/* Desktop */}
        <div className="md:block hidden">
          <ul className="flex gap-15">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="py-1 text-xl hover:text-purple-400"
              >
                {link.name === "Logout" ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <NavLink
                    onClick={() => setShowNav(false)}
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? "text-purple-400" : ""
                    }
                  >
                    {link.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile */}
        <div className="block md:hidden">
          <button
            className={`${
              showNav ? "opacity-0" : "opacity-100"
            } transition-all duration-500 p-2`}
            onClick={() => setShowNav(true)}
          >
            <Bars3Icon className="w-8 rounded" />
          </button>

          <div
            className={`fixed inset-0 z-20 bg-white p-4 transition-all duration-500 ease-in-out ${
              showNav
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-100"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Logo width={10} height={10} />

              <button
                onClick={() => setShowNav(false)}
                className="p-2 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
              >
                <XMarkIcon className="w-8" />
              </button>
            </div>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name} className="py-1 text-2xl text-center">
                  {link.name === "Logout" ? (
                    <button onClick={handleLogout}>Logout</button>
                  ) : (
                    <NavLink
                      onClick={() => setShowNav(false)}
                      to={link.to}
                      className={({ isActive }) =>
                        isActive ? "text-purple-400" : ""
                      }
                    >
                      {link.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
