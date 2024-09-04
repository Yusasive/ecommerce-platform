'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '../../../components/ProductForm';
import axios from 'axios';
import { Product } from '../../../types/product';

const CreateProductPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSave = async (product: Product) => {
    try {
      const response = await axios.post('/api/products', product);
      router.push('/');
    } catch (error) {
      setError('Error creating product.');
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Create Product</h1>
      {error && <div className="text-red-600">{error}</div>}
      <ProductForm mode="create" onSave={handleSave} />
    </div>
  );
};

export default CreateProductPage;
