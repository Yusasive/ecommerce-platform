import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '../types/product';
import Modal from '../components/Modal';

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      setIsModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="border border-purple-300 rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-shadow duration-200">
        <div className="w-full h-48 relative">
          <Image
            src={product.imageUrl || '/placeholder-image.png'}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <h2 className="text-2xl font-semibold mt-4 text-purple-900">{product.name}</h2>
        <p className="text-purple-900 mt-2">${product.price}</p>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="flex justify-between mt-4">
          {onEdit && (
            <button
              onClick={onEdit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${product.name}?`}
      />
    </>
  );
};

export default ProductCard;
