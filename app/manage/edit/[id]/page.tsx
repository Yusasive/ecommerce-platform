"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductForm from '../../../../components/ProductForm';
import axios from 'axios';
import { Product } from '../../../../types/product';
import { useParams } from 'next/navigation';

const EditProductPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure the id is a string and handle potential array cases
  const productId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          // Replace with your MockAPI URL
          const response = await axios.get<Product>(`https://65130c258e505cebc2e981a1.mockapi.io/products/${productId}`);
          setProduct(response.data);
        } catch (error) {
          setError('Error fetching product.');
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  const handleSave = (savedProduct: Product) => {
    router.push('/');
  };

  if (!productId) {
    return <div>Product ID is missing from the URL.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700">Edit Product</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : product ? (
        <ProductForm mode="edit" productId={productId} onSave={handleSave} />
      ) : (
        <div>Product not found.</div>
      )}
    </div>
  );
};

export default EditProductPage;
