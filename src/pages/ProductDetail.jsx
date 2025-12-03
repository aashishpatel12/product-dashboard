import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import PageLoader from '../components/PageLoader';

export default function ProductDetail() {
  const { id } = useParams();
  const { fetchProductById, deleteProduct } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);


  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };
    loadProduct();
  }, [id, fetchProductById]);

  const handleDelete = async () => {
    await deleteProduct(id);
    
    window.location.href = '/products'; 
    setShowConfirm(false);
  };

  if (loading) return <PageLoader />;

  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        
        <Link
          to="/products"
          className="inline-flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-300 hover:text-blue-600"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="h-96 relative bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain relative z-0 rounded-lg transition-all duration-300 hover:scale-110 hover:cursor-pointer"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {product.title}
            </h1>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              ${product.price}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-6">
              {product.category}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                to={`/edit/${product.id}`}
                className="flex-1 btn-primary bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br flex items-center justify-center gap-2 py-2 text-lg"
              >
                <Edit className="h-5 w-5" /> Edit Product
              </Link>
              <button
                onClick={() => setShowConfirm(true)}
                className="btn-danger px-8 py-2 text-lg flex gap-1 items-center"
              >
                <Trash2 className="h-5 w-5" /> Delete
              </button>
            </div>
          </div>
        </div>

        <ConfirmDeleteModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleDelete}
          productTitle={product.title}
        />
      </motion.div>
    </div>
  );
}

