
import { motion } from "framer-motion";

const bounce = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function DotsLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="flex space-x-3">
        <motion.div className="w-5 h-5 rounded-full bg-blue-600" variants={bounce} animate="animate" />
        <motion.div
          className="w-5 h-5 rounded-full bg-blue-500"
          variants={bounce}
          animate="animate"
          transition={{ delay: 0.2 }}
        />
        <motion.div
          className="w-5 h-5 rounded-full bg-blue-400"
          variants={bounce}
          animate="animate"
          transition={{ delay: 0.4 }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-5 text-2xl font-semibold text-blue-600 dark:text-blue-400"
      >
        Loading...
      </motion.p>
    </div>
  );
}
