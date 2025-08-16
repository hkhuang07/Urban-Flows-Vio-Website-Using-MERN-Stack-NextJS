import Header from '@/components/common/Header';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

/*import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}*/