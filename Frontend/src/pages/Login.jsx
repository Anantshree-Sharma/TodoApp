import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext/useUser";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setIsAuth } = useUser();

  const handlePasswordVisible = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const BASE_URL = import.meta.env.VITE_BASE_URL;

      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();

      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(result.msg);
      setIsAuth(true);
    } catch (error) {
      console.log("Error while login: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-2/5 h-64 lg:h-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-blue-600/90 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                <p className="text-purple-100">
                  Sign in to your account and continue your journey
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:w-3/5 p-6 sm:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-2">
                  Sign In
                </h1>
                <p className="text-gray-600">
                  Enter your credentials to access your account
                </p>
              </div>

              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                      onClick={handlePasswordVisible}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors duration-200">
                    Forgot your password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmitForm}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-purple-200 focus:outline-none"
                >
                  Sign In
                </button>

                {/* Signup Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{" "}
                  <Link
                    to={"/signup"}
                    className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
