import {
  UserGroupIcon,
  HeartIcon,
  LightBulbIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import { motion } from "framer-motion";

function About() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-6">
                About This Project
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A simple and elegant web application built with modern React to
                showcase clean design and user-friendly interfaces.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 pb-16">
          {/* Story Section */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/5 h-64 lg:h-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-blue-600/90 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <LightBulbIcon className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      Project Overview
                    </h2>
                    <p className="text-purple-100">
                      A modern React application demo
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:w-3/5 p-8 lg:p-12">
                <div className="max-w-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Simple & Effective
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    This full-stack MERN application demonstrates modern web
                    development practices using React for the frontend and
                    Express.js with MongoDB for the backend, featuring a
                    complete authentication system with JWT tokens and
                    Material-UI components.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Enhanced with Tailwind CSS for custom styling, Framer Motion
                    for animations, and additional libraries like Recharts for
                    data visualization and React Router for navigation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Advanced Features
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Data visualization with Recharts, date handling with Day.js,
                loading states with React Skeleton, and toast notifications for
                user feedback.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                JWT Authentication
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Secure user authentication using JSON Web Tokens with bcrypt
                password hashing, cookie-parser for session management, and
                express-validator for input validation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <LightBulbIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                MERN Stack
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Complete MongoDB, Express, React, and Node.js implementation
                with JWT authentication, password hashing, and secure cookie
                management.
              </p>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12"
          >
            <div className="p-8 lg:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-4">
                  MERN Stack
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  This comprehensive full-stack application showcases the
                  complete MERN technology stack with modern development
                  practices and additional powerful libraries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { name: "React", role: "Frontend Framework", initial: "R" },
                  { name: "Express", role: "Backend Framework", initial: "E" },
                  { name: "MongoDB", role: "Database", initial: "M" },
                  {
                    name: "Material-UI",
                    role: "Component Library",
                    initial: "U",
                  },
                ].map((tech, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      {tech.initial}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-gray-600">{tech.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 lg:p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Try It Out!</h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Experience the clean interface and smooth interactions. This demo
              showcases modern web development practices in action.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button className="inline-block bg-white text-purple-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
                Sign Up Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default About;
