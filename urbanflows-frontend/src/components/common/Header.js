"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDarkMode(initialTheme);
    document.documentElement.classList.add(initialTheme ? "dark" : "light");
  }, []);

    const toggleDarkMode = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        document.documentElement.classList.remove(isDarkMode ? 'dark' : 'light');
        document.documentElement.classList.add(newTheme ? 'dark' : 'light');
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

  return (
    <header className="bg-[#000624] text-white py-2 px-4 shadow-lg dark:bg-[#121212] dark:text-gray-100 transition-colors duration-300">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo và Tên */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logoandname.jpg"
            alt="Urban Flows Logo"
            width={180}
            height={80}
          />
       
        </Link>

        {/* Thanh tìm kiếm */}
        <div className="flex-1 max-w-2xl mx-8 relative">
          <input
            type="text"
            placeholder="Search for items, services, and more..."
            className="w-full px-4 py-2 pl-12 rounded-full bg-transparent text-white dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-custom-blue"
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-white dark:text-gray-200" />
        </div>

        {/* Các nút chức năng */}
        <div className="flex items-center space-x-4">
          {/* Nút chuyển đổi Dark/Light Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-white bg-gray-700 hover:bg-gray-600 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-colors duration-300"
            aria-label="Toggle Dark/Light Mode"
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>

          {/* Nút giỏ hàng */}
          <Link
            href="/cart"
            className="relative p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition"
          >
            <ShoppingCartIcon className="h-6 w-6 text-white" />
          </Link>

          {/* Nút Đăng nhập */}
          <Link
            href="/login"
            className="px-4 py-2 text-[#F0F8FF] bg-[#000010] border border-[#98F5FF] rounded-full hover:bg-[#191970] transition-colors duration-300"
          >
            Login
          </Link>

          {/* Nút Đăng ký */}
          <Link
            href="/register"
            className="px-4 py-2 text-[#F0F8FF] bg-[#000010] border border-[#7FFFD4] rounded-full hover:bg-[#458B74] transition-colors duration-300"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
