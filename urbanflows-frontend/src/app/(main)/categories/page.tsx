'use client';

import Link from 'next/link';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


// Định nghĩa kiểu dữ liệu cho Category
interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// Giả lập dữ liệu cho bảng
const dummyCategories: Category[] = [
  {
    _id: '1',
    name: 'Food',
    description: 'Fresh and delicious food items.',
    imageUrl: '/path/to/food-image.png',
  },
  {
    _id: '2',
    name: 'Groceries',
    description: 'Daily consumer goods and essentials.',
    imageUrl: '/path/to/groceries-image.png',
  },
  {
    _id: '3',
    name: 'Transport',
    description: 'Vehicles and mobility services.',
    imageUrl: '/path/to/transport-image.png',
  },
  {
    _id: '4',
    name: 'Pharmacy',
    description: 'Health and wellness products.',
    imageUrl: '/path/to/pharmacy-image.png',
  },
];

export default function CategoryManagementPage() {
  const handleDelete = (id: string) => {
    console.log(`Deleting category with ID: ${id}`);
    // Implement delete logic here, e.g., an API call
  };

  const handleUpdate = (id: string) => {
    console.log(`Updating category with ID: ${id}`);
    // Implement update logic here
  };

  const handleAdd = () => {
    console.log('Adding new category');
    // Implement add logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <button
          onClick={handleAdd}
          className="bg-[#36648B] text-[#F0F8FF] py-2 px-6 rounded-full font-semibold hover:bg-opacity-80 transition-colors duration-300"
        >
          Add New Category
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-[#27408B] text-[#F0F8FF]">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Image URL
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#E6E6FA]">
            {dummyCategories.map((category) => (
              <tr key={category._id} className="border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#191970]">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {category.imageUrl}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => handleUpdate(category._id)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1"
                    >
                        <FaEdit />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={() => handleDelete(category._id)}
                        className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                    >
                        <FaTrashAlt />
                        <span>Delete</span>
                    </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}