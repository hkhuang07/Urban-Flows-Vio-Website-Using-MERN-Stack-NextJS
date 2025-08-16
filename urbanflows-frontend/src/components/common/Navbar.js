<<<<<<< HEAD
// src/components/Navbar.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Bars3Icon,
  BellIcon,
  QuestionMarkCircleIcon,
  LanguageIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// NavbarItem component (đã cập nhật)
const NavbarItem = ({ icon: Icon, label, hasDropdown = false, dropdownItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setLanguage } = useLanguage();
  const dropdownRef = useRef(null); // Tạo ref để theo dõi phần tử dropdown

  // Hook để lắng nghe click bên ngoài và đóng dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}> {/* Gán ref vào phần tử cha */}
      <div
        className="flex items-center space-x-2 p-4 text-white hover:bg-gray-700 cursor-pointer"
        onClick={(e) => {
          // Ngăn sự kiện click lan truyền lên document để không đóng ngay lập tức
          e.stopPropagation();
          hasDropdown && setIsOpen(!isOpen);
        }}
      >
        {Icon && <Icon className="h-6 w-6" />}
        <span>{label}</span>
        {hasDropdown && (
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        )}
      </div>
      {hasDropdown && isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
          {dropdownItems.map((item, index) => (
            <Link
              key={index}
              href={item.href || '#'}
              className="block px-4 py-2 hover:bg-gray-700"
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                }
                if (item.lang) {
                  setLanguage(item.lang);
                  localStorage.setItem('language', item.lang);
                }
                setIsOpen(false); // Đóng dropdown sau khi click vào một item
              }}
            >
              {item.name}
            </Link>
          ))}
=======
'use client'; 

import Link from 'next/link';
import { Bars3Icon, BellIcon, QuestionMarkCircleIcon, LanguageIcon, UserCircleIcon, ChevronDownIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';


// Cần cài đặt Heroicons: npm install @heroicons/react

const NavbarItem = ({ icon: Icon, label, href, hasDropdown = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <div 
        className="flex items-center space-x-2 p-4 text-white hover:bg-gray-700 cursor-pointer"
        onClick={() => hasDropdown && setIsOpen(!isOpen)}
      >
        {Icon && <Icon className="h-6 w-6" />}
        <span>{label}</span>
        {hasDropdown && <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
      </div>
      {/* Dropdown menu */}
      {hasDropdown && isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
          <Link href="/items" className="block px-4 py-2 hover:bg-gray-700">Items</Link>
          <Link href="/categories" className="block px-4 py-2 hover:bg-gray-700">Categories</Link>
          <Link href="/manufacturers" className="block px-4 py-2 hover:bg-gray-700">Manufacturers</Link>
          <Link href="/order" className="block px-4 py-2 hover:bg-gray-700">Order</Link>
          <Link href="/account" className="block px-4 py-2 hover:bg-gray-700">Account</Link>
          <Link href="/topic" className="block px-4 py-2 hover:bg-gray-700">Topic</Link>
          <Link href="/articles" className="block px-4 py-2 hover:bg-gray-700">Articles</Link>
          <Link href="/shipperprofile" className="block px-4 py-2 hover:bg-gray-700">ShipperProfile</Link>
          <Link href="/shipperrequest" className="block px-4 py-2 hover:bg-gray-700">ShipperRequest</Link>
          <Link href="/ridebooking" className="block px-4 py-2 hover:bg-gray-700">RideBooking</Link>
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
<<<<<<< HEAD
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [managementCollections, setManagementCollections] = useState([]);
  const { language, setLanguage } = useLanguage();

  const sidebarRef = useRef(null); // Tạo ref cho sidebar

  // Hook để đóng sidebar khi click ra ngoài vùng sidebar và nút menu
  useEffect(() => {
    function handleClickOutside(event) {
      const menuButton = document.querySelector('[aria-label="Open Menu"]');
      if (isMenuOpen && sidebarRef.current && !sidebarRef.current.contains(event.target) && !menuButton.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

    setManagementCollections([
      { name: 'Categories', href: '/admin/categories' },
      { name: 'Manufacturers', href: '/admin/manufacturers' },
      { name: 'Items', href: '/admin/items' },
      { name: 'Orders', href: '/admin/orders' },
      { name: 'Accounts', href: '/admin/accounts' },
      { name: 'Articles', href: '/admin/articles' },
      { name: 'Topics', href: '/admin/topics' }
    ]);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const user = {
    avatar: '/avatar.png',
    name: 'User Profile'
  };

  return (
    <nav className="bg-[#000624] text-white flex justify-between items-center h-16">
      {/* Menu và các mục bên trái */}
      <div className="flex items-center">
        {/* Menu Hamburger Button */}
        <div
          className="flex items-center space-x-2 p-4 border-r border-gray-700 hover:bg-gray-700 cursor-pointer"
          onClick={toggleMenu}
          aria-label="Open Menu"
        >
          <Bars3Icon className="h-6 w-6" />
          <span className="text-sm">Menu</span>
        </div>

        {/* Categories và Management */}
        <NavbarItem
          icon={Squares2X2Icon}
          label="Categories"
          hasDropdown
          dropdownItems={categories.map(cat => ({ name: cat.name, href: `/category/${cat._id}` }))}
        />
        <NavbarItem
          icon={Squares2X2Icon}
          label="Management"
          hasDropdown
          dropdownItems={managementCollections}
        />
      </div>

      {/* Side Drawer (đã cập nhật) */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-[#121212] z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 text-white">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={toggleMenu} aria-label="Close Menu">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <ul className="p-4 text-white">
          {/* LOẠI BỎ onClick={toggleMenu} khỏi các li để không đóng sidebar ngay lập tức */}
          <li>
            <NavbarItem
              icon={Squares2X2Icon}
              label="Categories"
              hasDropdown
              dropdownItems={categories.map(cat => ({ name: cat.name, href: `/category/${cat._id}` }))}
            />
          </li>
          <li>
            <NavbarItem
              icon={Squares2X2Icon}
              label="Management"
              hasDropdown
              dropdownItems={managementCollections}
            />
          </li>
          <li>
            <Link href="/profile" className="flex items-center space-x-2 p-2 hover:bg-gray-700" onClick={toggleMenu}>
              <UserCircleIcon className="h-6 w-6" />
              <span>Account</span>
            </Link>
          </li>
          <li>
            <NavbarItem
              icon={LanguageIcon}
              label={language === 'vi' ? 'Ngôn ngữ' : 'Language'}
              hasDropdown
              dropdownItems={[
                { name: 'Tiếng Việt', lang: 'vi' },
                { name: 'English', lang: 'en' },
              ]}
            />
          </li>
          <li>
            <Link href="/help" className="flex items-center space-x-2 p-2 hover:bg-gray-700" onClick={toggleMenu}>
              <QuestionMarkCircleIcon className="h-6 w-6" />
              <span>Help</span>
            </Link>
          </li>
        </ul>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleMenu} />
      )}

      {/* Các mục bên phải */}
      <div className="flex items-center">
        <div className="flex items-center space-x-2 p-4 text-white hover:bg-gray-700 cursor-pointer">
          <BellIcon className="h-6 w-6" />
          <span>Notification</span>
        </div>
        <div className="flex items-center space-x-2 p-4 text-white hover:bg-gray-700 cursor-pointer">
          <QuestionMarkCircleIcon className="h-6 w-6" />
          <span>Help</span>
        </div>
        <NavbarItem
          icon={LanguageIcon}
          label={language === 'vi' ? 'Ngôn ngữ' : 'Language'}
          hasDropdown
          dropdownItems={[
            { name: 'Tiếng Việt', lang: 'vi' },
            { name: 'English', lang: 'en' },
          ]}
        />
        <Link href="/profile" className="flex items-center space-x-2 p-4 text-white hover:bg-gray-700">
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image src="/avatar.png" alt="User Avatar" width={32} height={32} />
          </div>
          <span>Profile</span>
        </Link>
=======
  return (
    <nav className="bg-[#000624] text-white flex justify-start items-center">
      {/* Menu Hamburger */}
      <div className="flex items-center space-x-2 p-4 border-r border-gray-700 hover:bg-gray-700 cursor-pointer">
        <Bars3Icon className="h-6 w-6" />
        <span className="text-sm">Menu</span>
      </div>

      {/* Các mục điều hướng */}
      <div className="flex-grow flex justify-start space-x-0">
        <NavbarItem icon={Squares2X2Icon} label="Categories" hasDropdown />
        <NavbarItem icon={Squares2X2Icon} label="Management" hasDropdown />
        <NavbarItem icon={BellIcon} label="Notification" />
        <NavbarItem icon={QuestionMarkCircleIcon} label="Help" />
        <NavbarItem icon={LanguageIcon} label="Language" hasDropdown />
        <NavbarItem icon={UserCircleIcon} label="Account" hasDropdown />
>>>>>>> d693b521d5239c23a76850ff3661eacb995d131e
      </div>
    </nav>
  );
}