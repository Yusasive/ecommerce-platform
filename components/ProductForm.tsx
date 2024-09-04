'use client';

import React, { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../types/product';
import { createProduct, updateProduct, getProductById } from '../services/productService';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  mode: 'edit' | 'create';
  productId?: string;
  onSave: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ mode, productId, onSave }) => {
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: ProductCategory.Electronics,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (mode === 'edit' && productId) {
      setLoading(true);
      getProductById(productId)
        .then((data) => setProduct(data))
        .catch(() => setError('Error fetching product details.'))
        .finally(() => setLoading(false));
    }
  }, [mode, productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'create') {
        const newProduct = await createProduct(product);
        onSave(newProduct);
      } else if (mode === 'edit' && productId) {
        const updatedProduct = await updateProduct(productId, product);
        onSave(updatedProduct);
      }
      router.push('/');
    } catch (error) {
      setError('Error saving product.');
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {error && <div className="text-red-600">{error}</div>}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="w-full border border-purple-300 rounded p-3 text-purple-900 focus:ring-2 focus:ring-purple-600"
        required
        disabled={loading}
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={product.description}
        onChange={handleChange}
        className="w-full border border-purple-300 rounded p-3 text-purple-900 focus:ring-2 focus:ring-purple-600"
        required
        disabled={loading}
      />
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        value={product.price}
        onChange={handleChange}
        className="w-full border border-purple-300 rounded p-3 text-purple-900 focus:ring-2 focus:ring-purple-600"
        required
        min="0"
        step="0.01"
        disabled={loading}
      />
      <input
        type="url"
        name="imageUrl"
        placeholder="Image URL"
        value={product.imageUrl}
        onChange={handleChange}
        className="w-full border border-purple-300 rounded p-3 text-purple-900 focus:ring-2 focus:ring-purple-600"
        required
        disabled={loading}
      />
      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        className="w-full border border-purple-300 rounded p-3 text-purple-900 focus:ring-2 focus:ring-purple-600"
        required
        disabled={loading}
      >
        {Object.values(ProductCategory).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
        disabled={loading}
      >
        {loading ? 'Saving...' : mode === 'edit' ? 'Update Product' : 'Save Product'}
      </button>
    </form>
  );
};

export default ProductForm;
