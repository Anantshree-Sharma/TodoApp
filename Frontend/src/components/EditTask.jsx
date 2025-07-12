import { useLocation, useParams } from "react-router-dom";
import SpinnerLoading from "./SpinnerLoading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditTask() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const categories = [
    "study",
    "professional",
    "personal",
    "home",
    "health",
    "shopping",
    "social",
    "others",
  ];

  const statuses = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/task/edit/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status,
          category,
        }),
      });
      const result = await res.json();
      if (result.error) {
        toast.error(result.error);
        return;
      }

      navigate(-1);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/task/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 204) {
        toast.success("deleted");
        navigate("/home");
        return;
      }

      const result = await res.json();

      if (result.error) {
        toast.error(result.error);
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${BASE_URL}/task/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const result = await res.json();
        if (result.error) {
          navigate("/home/task-wall");
          toast.error(result.error);
          return;
        }
        setTitle(result.title);
        setDescription(result.description);
        setStatus(result.status);
        setCategory(result.category);
      } catch (error) {
        console.log(error);
        navigate("/home/task-wall");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchTask();
  }, []);

  return (
    <div>
      {loading ? (
        <>
          <SpinnerLoading />
        </>
      ) : (
        <>
          <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Enter task description (optional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  />
                </div>

                {/* Category Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <div className="space-y-2">
                    {statuses.map((stat) => (
                      <div
                        key={stat.value}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          id={stat.value}
                          name="status"
                          value={stat.value}
                          checked={status === stat.value}
                          onChange={(e) => setStatus(e.target.value)}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-400"
                        />
                        <label
                          htmlFor={stat.value}
                          className="flex items-center cursor-pointer"
                        >
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              stat.value
                            )}`}
                          >
                            {stat.label}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-purple-200 focus:outline-none cursor-pointer"
                  >
                    Update Task
                  </button>

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex-1 bg-gradient-to-r to-blue-600 via-red-400 from-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-gray-200 focus:outline-none cursor-pointer"
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditTask;
