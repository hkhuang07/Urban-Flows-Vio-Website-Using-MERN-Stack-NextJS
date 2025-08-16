'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image'; // Thêm Image component của Next.js

interface FormData {
  name: string;
  description: string;
  imageUrl: string;
}

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    imageUrl: '',
  });
  // Thêm state cho file hình ảnh mới
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // useEffect để tải dữ liệu danh mục khi trang được render
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:3001/api/categories/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category data');
        }
        const data = await response.json();
        setFormData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      let finalImageUrl = formData.imageUrl;

      // BƯỚC 1: Nếu có file mới, gửi lên backend để tải lên
      if (file) {
        const uploadData = new FormData();
        uploadData.append('file', file);

        const uploadResponse = await fetch('http://localhost:3001/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        if (!uploadResponse.ok) {
          // Kiểm tra nếu response là JSON
          const contentType = uploadResponse.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            const errorData = await uploadResponse.json();
            throw new Error(errorData.message || 'Image upload failed');
          } else {
            // Nếu không phải JSON, trả về một thông báo lỗi chung
            throw new Error('Image upload failed: Server returned non-JSON response.');
          }
        }

        const uploadResult = await uploadResponse.json();
        finalImageUrl = uploadResult.imageUrl;
      }

      // BƯỚC 2: Gửi dữ liệu danh mục đã cập nhật
      const updatedCategoryData = {
        ...formData,
        imageUrl: finalImageUrl,
      };

      const response = await fetch(`http://localhost:3001/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategoryData),
      });

      if (!response.ok) {
        // Kiểm tra nếu response là JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update category');
        } else {
          // Nếu không phải JSON, trả về một thông báo lỗi chung
          throw new Error('Failed to update category: Server returned non-JSON response.');
        }
      }

      const result = await response.json(); // Đảm bảo parse JSON
      setSuccess('Category updated successfully!');
      setTimeout(() => {
        router.push('/categories');
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading category data...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  const sanitizedImageUrl = formData.imageUrl && !formData.imageUrl.startsWith('/') && !formData.imageUrl.startsWith('http')
    ? `/${formData.imageUrl}`
    : formData.imageUrl;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-[#F0F8FF]">
      <div className="max-w-xl mx-auto p-8 bg-[#000005] rounded-xl shadow-lg border border-[#98F5FF] mt-10">
        <h1 className="text-3xl font-bold text-[#98F5FF] mb-6 text-center">Edit Category</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
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
            <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>
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
              Image File (Leave blank to keep current image)
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="w-full p-3 rounded-md bg-gray-800 text-[#F0F8FF] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#98F5FF]"
            />
            {file ? (
              <p className="mt-2 text-sm text-gray-400">Selected file: {file.name}</p>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-gray-400">Current Image:</p>
                {sanitizedImageUrl ? (
                  <Image
                    src={sanitizedImageUrl}
                    alt={formData.name}
                    width={200}
                    height={200}
                    objectFit="cover"
                    className="rounded-lg mt-2"
                  />
                ) : (
                  <div className="text-gray-500 mt-2">No Image</div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`py-3 px-8 rounded-full font-semibold transition-colors duration-300 ${saving ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#27408B] text-[#F0F8FF] hover:bg-[#191970]'
                }`}
            >
              {saving ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}