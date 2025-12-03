import { motion } from 'framer-motion';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, productTitle }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Delete Product?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete "<span className="font-semibold">{productTitle}</span>"?
          This action cannot be undone.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 btn-danger py-3 text-lg font-semibold"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}