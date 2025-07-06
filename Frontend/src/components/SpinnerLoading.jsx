import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SpinnerLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>

        {/* Glow effect */}
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-ping"></div>
      </div>

      {/* Loading text with animated dots */}
      <div className="mt-6 text-center">
        <div className="text-lg font-medium text-gray-700 mb-2 flex items-center justify-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpinnerLoading;
