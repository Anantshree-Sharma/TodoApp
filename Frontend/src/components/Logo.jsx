function Logo({ width = 10, text = "xl" }) {
  // Map sizes to Tailwind classes
  const sizeClass = {
    2: "w-2 h-2",
    4: "w-4 h-4",
    6: "w-6 h-6",
    8: "w-8 h-8",
    10: "w-10 h-10",
    12: "w-12 h-12",
  };

  const innerSizeClass = {
    2: "w-1 h-1",
    4: "w-2 h-2",
    6: "w-4 h-4",
    8: "w-6 h-6",
    10: "w-8 h-8",
    12: "w-10 h-10",
  };

  const textSizeClass = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  };

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg flex items-center justify-center ${
          sizeClass[width] || "w-10 h-10"
        }`}
      >
        <div
          className={`bg-white rounded-md flex items-center justify-center ${
            innerSizeClass[width] || "w-8 h-8"
          }`}
        >
          <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-sm"></div>
        </div>
      </div>
      <span className={`flex font-bold ${textSizeClass[text] || "text-xl"}`}>
        <p className="bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
          TO
        </p>
        <p className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          DO
        </p>
      </span>
    </div>
  );
}

export default Logo;
