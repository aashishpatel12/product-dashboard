import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import PageLoader from '../components/PageLoader';

export default function Products() {
  const { products, loading, deleteProduct } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filtered = products
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(p => !category || category === 'all' || p.category === category);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
   
  if (loading) {
    return <PageLoader />;
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
          Product Dashboard
        </h1>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="input pl-12"
            />
          </div>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
            className="input"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl h-96 animate-pulse shadow-lg" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginated.map(product => (
              <ProductCard key={product.id} product={product} onDelete={deleteProduct} />
            ))}
          </motion.div>
        )}

        {!loading && totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </motion.div>
    </div>
  );
}