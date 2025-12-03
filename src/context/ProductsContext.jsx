
import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/axios';
import toast from 'react-hot-toast';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data);
      setHasFetched(true);
    } catch (err) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasFetched) {
      fetchProducts();
    }
  }, [hasFetched, fetchProducts]);

  const fetchProductById = async (id) => {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      toast.error('Failed to fetch product details');
      return null;
    }
  };

  const addProduct = async (formData) => {
    try {
      const payload = {
        id: 0,
        title: formData.title,
        price: parseFloat(formData.price) || 0.1,
        description: formData.description,
        category: formData.category,
        image: formData.image,
      };
      const res = await api.post('/products', payload);
      setProducts(prev => [res.data, ...prev]);
      toast.success('Product added successfully!');
      return res.data;
    } catch (err) {
      toast.error('Failed to add product');
      throw err;
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      const payload = {
        id: parseInt(id),
        title: formData.title,
        price: parseFloat(formData.price) || 0.1,
        description: formData.description,
        category: formData.category,
        image: formData.image,
      };
      const res = await api.put(`/products/${id}`, payload);
      setProducts(prev =>
        prev.map(p => (p.id === parseInt(id) ? res.data : p))
      );
      toast.success('Product updated successfully!');
      return res.data;
    } catch (err) {
      toast.error('Failed to update product');
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== parseInt(id)));
      toast.success('Product deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete product');
      throw err;
    }
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProductById,
    refetch: fetchProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};