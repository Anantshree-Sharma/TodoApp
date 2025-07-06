import { Link, Navigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useUser } from "../context/userContext/useUser";

export default function Start() {
  const { isAuth } = useUser();
  if (isAuth) {
    return <Navigate to={"/home"} replace />;
  }
  return (
    <div>
      <div className="bg-[url('/bg-img-small.avif')] md:bg-[url('/bg-img.avif')] md:bg-center md:bg-cover bg-bottom bg-contain w-full h-[calc(100vh-113px)] bg-no-repeat">
        <div className="pt-10 xl:pt-10 md:pt-20 lg:pt-1">
          <motion.div
            initial={{ opacity: 0, y: 400 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-4/5 m-auto lg:m-10 flex flex-col items-center gap-8 xl:w-2/5 lg:w-1/3"
          >
            <motion.div>
              <h1 className="text-4xl xl:text-7xl md:text-5xl lg:text-4xl text-center font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-blue-200 bg-clip-text text-transparent ">
                Manage and Track
                <br />
                <span className="text-2xl xl:text-5xl md:text-3xl lg:text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  your Tasks
                </span>
              </h1>
              <h3 className="text-center mt-2 text-sm font-semibold text-gray-600">
                Transform your productivity with our intelligent task management
                platform. Organize, prioritize, and achieve your goals
                effortlessly.
              </h3>
              <p className="text-sm text-center mt-4">
                Already have a Account ?{" "}
                <Link to={"/login"} className="text-purple-600 underline">
                  click here
                </Link>
              </p>
            </motion.div>
            <Link
              to={"/signup"}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 font-semibold rounded-full shadow-2xl shadow-purple-500/25 transition-all  transform hover:scale-105 hover:shadow-purple-500/40 duration-300 text-white text-lg flex items-center pl-4 pr-3 py-2 gap-2"
            >
              Get Started
              <ArrowRightIcon className="w-6" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
