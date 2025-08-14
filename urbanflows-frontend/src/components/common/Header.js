'use client'; 
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Để sử dụng icons, bạn cần cài đặt Heroicons:
// npm install @heroicons/react

export default function Header() {
  return (
    <header className="bg-[#000624] text-white py-2 px-4 shadow-lg">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo và Tên */}
        <Link href="/" className="flex items-center space-x-2">
          {/*logo.jpg trong vào thư mục public*/}
          <Image src="/header-logo.jpg" alt="Urban Flows Logo" width={50} height={50} />
          <span className="text-xl font-bold">Urban Flows</span>
        </Link>

        {/* Thanh tìm kiếm */}
        <div className="flex-1 max-w-2xl mx-8 relative">
          <input
            type="text"
            placeholder="Search for items, services, and more..."
            className="w-full px-4 py-2 pl-12 rounded-full bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-custom-blue" // shadow-custom-blue sẽ được định nghĩa ở dưới
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-white" />
        </div>

        {/* Giỏ hàng */}
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <div className="relative p-3 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition">
              <ShoppingCartIcon className="h-6 w-6 text-white" />
              {/* Thẻ hiển thị số lượng sản phẩm trong giỏ (nếu có) */}
              {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                3
              </span> */}
            </div>
          </Link>
          {/* Có thể thêm nút đăng nhập/đăng ký ở đây */}
          {/* <Link href="/login" className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">Login</Link> */}
        </div>
      </nav>
    </header>
  );
}