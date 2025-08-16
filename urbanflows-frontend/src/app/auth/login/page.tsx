'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUser, FaLock } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      // Lưu token vào localStorage (hoặc cookies)
      localStorage.setItem('token', data.token);

      // Chuyển hướng đến trang chính hoặc trang tài khoản
      router.push('/account');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const motto = "In the Urban Flows, Find Your Perfect Beat!";

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 md:p-12">
      {/* Background with gradient and blur effect */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/darkbluecity.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent backdrop-filter blur-lg" />
      </div>

      <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl backdrop-blur-md bg-white/10 dark:bg-gray-800/20">
        {/* Phần bên trái - Chào mừng và slogan */}
        <div className="relative hidden w-1/2 md:flex items-center justify-center p-8 bg-cover bg-center" style={{ backgroundImage: "url('/52hzfindamenody.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent backdrop-filter blur-lg" />
          <div className="relative text-center text-[#F0F8FF] z-10 p-4">
            <h1 className="text-3xl font-bold mb-4">Welcome to Urban Flows</h1>
            <p className="text-xl text-[#E6E6FA] italic font-light">{motto}</p>
          </div>
        </div>

        {/* Phần bên phải - Form Đăng nhập */}
        <div className="w-full md:w-1/2 p-12 bg-gradient-to-b from-[#] to-[#000005] text-white flex flex-col justify-center rounded-r-xl">
          <div className="flex justify-end mb-4">
            <Link href="/auth/register" className="text-gray-300 hover:text-white transition-colors">
              <span className="text-sm">&lt; Back</span>
            </Link>
          </div>

          <h2 className="text-4xl font-semibold text-center mb-8"> Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#5F9EA0]" />
              <input
                type="email"
                placeholder="Username/Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#000009] text-white py-3 pl-10 pr-4 border border-[#191970] rounded-md focus:outline-none focus:ring-2 focus:ring-[#98F5FF] transition-all duration-300"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#5F9EA0]" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#000009] text-white py-3 pl-10 pr-4 border border-[#191970] rounded-md focus:outline-none focus:ring-2 focus:ring-[#98F5FF] transition-all duration-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#1874CD] to-[#27408B] text-white font-bold rounded-lg hover:from-[#191970] hover:to-[#3A5FCD] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-[#98F5FF] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}