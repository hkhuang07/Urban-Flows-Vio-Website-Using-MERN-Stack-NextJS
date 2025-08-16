'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export default function DeleteCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:3001/api/categories/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category data.');
        }
        const data = await response.json();
        setCategory(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`http://localhost:3001/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category.');
      }

      setSuccess('Category deleted successfully!');
      setTimeout(() => {
        router.push('/categories');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    router.push('/categories');
  };

  if (loading) {
    return <div className="text-center mt-10">Loading category data...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  if (!category) {
    return <div className="text-center mt-10 text-yellow-500">Category not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-[#F0F8FF]">
      <div className="max-w-xl mx-auto p-8 bg-[#000005] rounded-xl shadow-lg border border-[#FF6347] mt-10">
        <h1 className="text-3xl font-bold text-[#FF6347] mb-6 text-center">Confirm Deletion</h1>
        <p className="text-center mb-6 text-lg">Are you sure you want to delete the following category?</p>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <div className="flex items-center space-x-4 mb-4">
            {category.imageUrl && (
              <Image
                src={category.imageUrl.startsWith('/') ? category.imageUrl : `/${category.imageUrl}`}
                alt={category.name}
                width={100}
                height={100}
                objectFit="cover"
                className="rounded-lg"
              />
            )}
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-[#98F5FF]">{category.name}</h2>
              <p className="text-sm text-gray-400">{category.description}</p>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`py-3 px-8 rounded-full font-semibold transition-colors duration-300 ${
              deleting ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#FF6347] text-[#F0F8FF] hover:bg-[#E5533D]'
            }`}
          >
            {deleting ? 'Deleting...' : 'Confirm Delete'}
          </button>
          <button
            onClick={handleCancel}
            className="py-3 px-8 rounded-full font-semibold transition-colors duration-300 bg-gray-700 text-[#F0F8FF] hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}