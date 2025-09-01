import { motion } from "motion/react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <span className="ml-3 text-lg font-semibold text-gray-700">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
