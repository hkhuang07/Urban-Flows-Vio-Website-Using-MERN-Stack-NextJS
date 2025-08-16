'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  description: string;
}

export default function AddCategoryPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Thêm state để hiển thị thông báo thành công
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null); // Reset trạng thái thông báo

    if (!file) {
      setError('Please select an image file to upload.');
      setLoading(false);
      return;
    }

    try {
      // BƯỚC 1: Gửi hình ảnh đến backend để tải lên
      const uploadData = new FormData();
      uploadData.append('file', file);

      const uploadResponse = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Image upload failed');
      }

      const uploadResult = await uploadResponse.json();
      const imageUrl = uploadResult.imageUrl;

      // BƯỚC 2: Gửi thông tin danh mục cùng với URL hình ảnh đến backend
      const categoryData = {
        ...formData,
        imageUrl: imageUrl,
      };

      const categoryResponse = await fetch('http://localhost:3001/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Bạn có thể cần thêm Authorization header ở đây nếu route được bảo vệ
        },
        body: JSON.stringify(categoryData),
      });

      if (!categoryResponse.ok) {
        const errorData = await categoryResponse.json();
        throw new Error(errorData.message || 'Failed to add category');
      }

      // THÊM: Hiển thị thông báo thành công và chuyển hướng
      setSuccess('Category added successfully! Redirecting...');
      setTimeout(() => {
        router.push('/categories');
      }, 2000); // Chuyển hướng sau 2 giây
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-[#F0F8FF]">
      <div className="max-w-xl mx-auto p-8 bg-[#000005] rounded-xl shadow-lg border border-[#98F5FF] mt-10">
        <h1 className="text-3xl font-bold text-[#98F5FF] mb-6 text-center">Add New Category</h1>
        <form onSubmit={handleSubmit}>
          {/* HIỂN THỊ THÔNG BÁO TẠI ĐÂY */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-[#F0F8FF] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#98F5FF]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-lg font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 rounded-md bg-gray-800 text-[#F0F8FF] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#98F5FF]"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="file" className="block text-lg font-medium mb-2">
              Image File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="w-full p-3 rounded-md bg-gray-800 text-[#F0F8FF] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#98F5FF]"
              required
            />
            {file && (
              <p className="mt-2 text-sm text-gray-400">Selected file: {file.name}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`py-3 px-8 rounded-full font-semibold transition-colors duration-300 ${
                loading || success
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-[#27408B] text-[#F0F8FF] hover:bg-[#191970]'
              }`}
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}