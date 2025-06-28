function Logo({ width = 2, height = 2, text = "xl" }) {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-${width} h-${height} bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg`}
      >
        <div
          className={`w-${width - 4} h-${
            height - 4
          } bg-white rounded-md flex items-center justify-center`}
        >
          <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-sm"></div>
        </div>
      </div>
      <span className={`flex text-${text} font-bold`}>
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
