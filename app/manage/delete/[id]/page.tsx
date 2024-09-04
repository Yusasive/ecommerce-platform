"use client";

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const DeleteProduct = () => {
  const router = useRouter();
  const { id } = useParams();

  // Ensure the id is a string and handle potential array cases
  const productId = Array.isArray(id) ? id[0] : id;

  const handleDelete = async () => {
    try {
      await fetch(`https://65130c258e505cebc2e981a1.mockapi.io/products/${productId}`, {
        method: 'DELETE',
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to delete the product:', error);
    }
  };

  if (!productId) {
    return <div>Product ID is missing from the URL.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700">Delete Product</h1>
      <p>Are you sure you want to delete this product?</p>
      <div className="mt-4">
        <button 
          onClick={handleDelete} 
          className="bg-red-500 text-white py-2 px-4 rounded mr-2">
          Yes, Delete
        </button>
        <button 
          onClick={() => router.push('/')} 
          className="bg-gray-500 text-white py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
