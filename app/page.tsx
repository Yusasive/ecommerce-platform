'use client';

import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { Product, ProductCategory } from '../types/product';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TailChaseLoader from '../components/TailChaseLoader';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Set<ProductCategory>>(new Set());
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const MOCKAPI_URL = 'https://65130c258e505cebc2e981a1.mockapi.io/products';

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Product[]>(MOCKAPI_URL);
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching products.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    router.push(`/manage/edit/${product.id}`);
  };

  const handleDelete = async (product: Product) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        setLoading(true);
        await axios.delete(`${MOCKAPI_URL}/${product.id}`);
        setProducts(products.filter((p) => p.id !== product.id));
        console.log(`Deleted product with ID: ${product.id}`);
      } catch (error) {
        setError('Error deleting product.');
        console.error('Error deleting product:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const openCreateForm = () => {
    router.push('/manage/add');
  };

  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategories(prev => {
      const newCategories = new Set(prev);
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      return newCategories;
    });
  };

  const filteredProducts = products.filter(product =>
    selectedCategories.size === 0 || selectedCategories.has(product.category)
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row lg:space-x-6 mb-6">
        {/* Filter Section */}
        <div className="lg:w-1/4 bg-white shadow-lg rounded-lg p-4 mb-6 lg:mb-0">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Filter Products by Category</h2>
          <div className="space-y-4">
            {Object.values(ProductCategory).map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.has(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="form-checkbox"
                />
                <span className="ml-2 text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product List Section */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6 bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-3xl font-bold text-purple-700">Product Listing</h1>
            <button
              onClick={openCreateForm}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              Add New Product
            </button>
          </div>

          {loading ? (
            <TailChaseLoader /> // Use the TailChaseLoader component here
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <ProductList
              products={filteredProducts}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
