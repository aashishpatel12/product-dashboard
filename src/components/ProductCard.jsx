
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useState } from 'react';

export default function ProductCard({ product, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(product.id);
    setShowConfirm(false);
  };

  return (
    <>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
      >
        <Link 
        to={`/product/${product.id}`}
         >
        <div className="h-64 relative bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4 ">
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain relative z-0 rounded-lg transition-all duration-300 hover:scale-110 hover:cursor-pointer" />
        </div>
        </Link>
        <div className="p-6">
          <h3 className="font-bold  text-lg text-gray-800 dark:text-white line-clamp-1 mb-2">
            {product.title}
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            ${product.price}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-4">
            {product.category}
          </p>

          <div className="flex gap-2">
            <Link
              to={`/edit/${product.id}`}
              className="flex-1 btn-primary bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br flex items-center justify-center gap-2 py-2"
            >
              <Edit className="h-4 w-4" /> Edit
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className="btn-danger p-2 rounded-lg"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <ConfirmDeleteModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        productTitle={product.title}
      />
    </>
  );
}