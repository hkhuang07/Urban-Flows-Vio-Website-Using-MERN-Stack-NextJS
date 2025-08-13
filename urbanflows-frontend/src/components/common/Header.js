import Link from 'next/link';

export default function Header() {
  // Logic kiểm tra người dùng đã đăng nhập và hiển thị nút Logout/Profile
  return (
    <header className="bg-white shadow p-4">
      <nav className="flex justify-between items-center container mx-auto">
        <Link href="/" className="text-xl font-bold text-blue-600">
          UrbanFlows
        </Link>
        <div className="space-x-4">
          <Link href="/items" className="text-gray-600 hover:text-blue-600">Items</Link>
          <Link href="/articles" className="text-gray-600 hover:text-blue-600">Articles</Link>
          <Link href="/account" className="text-gray-600 hover:text-blue-600">Accounts</Link>
          {/* Nút đăng nhập/đăng xuất */}
        </div>
      </nav>
    </header>
  );
}