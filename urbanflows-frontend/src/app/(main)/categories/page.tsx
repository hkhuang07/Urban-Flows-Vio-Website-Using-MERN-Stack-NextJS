// app/(admin)/categories/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link từ next/link để điều hướng
import { useRouter } from 'next/navigation'; // Thêm dòng này
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Image from 'next/image';

// Định nghĩa kiểu dữ liệu cho Category
interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// Component cho từng thẻ danh mục (Card)
const CategoryCard = ({ category, onUpdate, onDelete }) => {
  const sanitizedImageUrl = category.imageUrl && !category.imageUrl.startsWith('/') && !category.imageUrl.startsWith('http')
    ? `/${category.imageUrl}`
    : category.imageUrl;

  return (
    <div className="bg-[#000624] rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full">
      <div className="relative w-full aspect-video">
        {sanitizedImageUrl ? (
          <Image
            src={sanitizedImageUrl}
            alt={category.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-[#98F5FF] truncate">{category.name}</h3>
          <p className="mt-1 text-sm text-[#F0F8FF] line-clamp-2">{category.description}</p>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={() => onUpdate(category._id)}
            className="text-[#1E90FF] hover:text-[#104E8B] flex items-center space-x-1 font-medium text-sm"
          >
            <FaEdit />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className="text-[#87CEEB] hover:text-[#5F9EA0] flex items-center space-x-1 font-medium text-sm"
          >
            <FaTrashAlt />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        const validCategories = data.filter(cat => cat && cat.name);
        setCategories(validCategories);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = (id: string) => {
    router.push(`/categories/${id}/delete`);
  };

  const handleUpdate = (id: string) => {
    router.push(`/categories/${id}/edit`);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <Link
          href="/categories/add"
          className="bg-[#27408B] text-[#F0F8FF] py-2 px-6 rounded-full font-semibold hover:bg-[#191970] transition-colors duration-300"
        >
          Add New Category
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}