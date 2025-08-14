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
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
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
      </div>
    </nav>
  );
}