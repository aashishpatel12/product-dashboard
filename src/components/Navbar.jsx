
import { Link } from 'react-router-dom';
import { ShoppingCart, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Add Product", path: "/add" }
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="flex items-center space-x-3">
            <ShoppingCart className="h-9 w-9 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Product Dashboard</span>
          </Link>

          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative pb-1 font-semibold transition
                  ${pathname === item.path
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  }`}
              >
                {item.name}

                
                {pathname === item.path && (
                  <span className="absolute left-0 right-0 -bottom-1 h-[3px] bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

         
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-700" />
            )}
          </button>

          
          <button
            className="md:hidden ml-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6 text-gray-800 dark:text-white" /> : <Menu className="h-6 w-6 text-gray-800 dark:text-white" />}
          </button>

        </div>

        
        {open && (
          <div className="md:hidden flex flex-col gap-3 pb-4 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`text-lg font-medium px-2 py-2 rounded-md transition
                  ${pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
