import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Products from './pages/Products';
import ProductForm from './components/ProductForm';
import ProductDetail from './pages/ProductDetail';
import { ProductsProvider } from './context/ProductsContext';

function App() {
  return (
     <>
      <Navbar />
      <ProductsProvider>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      </ProductsProvider>
      </>
  );
}

export default App;