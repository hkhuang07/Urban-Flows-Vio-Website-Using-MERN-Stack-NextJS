import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#000624] text-[#F0F8FF] pt-12 pb-7 border border-[#000624]">
      <div className="container mx-auto px-4">
        {/* Phần 5 cột thông tin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-t border-[#C1CDCD] pt-6 pb-6">

          {/* Cột 1: Introduce */}
          <div className="p-4 border-r border-[#C1CDCD] sm:border-r-0 md:border-r">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF] text-center lg:text-left">Introduce</h3>
            <p className="text-sm text-center lg:text-left text-gray-300">
              Urban Flows is a multi-function website. There are several functions including: sales, booking, delivery...
            </p>
          </div>

          {/* Cột 2: Customer Service */}
          <div className="p-4 border-r border-[#C1CDCD] sm:border-r-0 md:border-r">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF] text-center lg:text-left">Customer Service</h3>
            <ul className="text-sm space-y-2 text-center lg:text-left">
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Urban Flows Help Center</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Urban Flows Blog</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Urban Flows Mall</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">How To Buy</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">How To Sell</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">How To Book</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Payment</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Shipping</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Return and Refund</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Warranty Policy</Link></li>
            </ul>
          </div>

          {/* Cột 3: About Urban Flows */}
          <div className="p-4 border-r border-[#C1CDCD] md:border-r">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF] text-center lg:text-left">About Urban Flows</h3>
            <ul className="text-sm space-y-2 text-center lg:text-left">
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">About us</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Urban Flows Career</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Urban Flows Policy</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Urban Flows Mall</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Sell Center</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Flash Deals</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Media Contact</Link></li>
            </ul>
          </div>

          {/* Cột 4: Follow Urban Flows */}
          <div className="p-4 border-r border-[#C1CDCD] sm:border-r-0 lg:border-r">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF] text-center lg:text-left">Follow Urban Flows</h3>
            <ul className="text-sm space-y-2 text-center lg:text-left">
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Facebook</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">LinkedIn</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Github</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Instagram</Link></li>
            </ul>
          </div>

          {/* Cột 5: Payment & Delivery */}
          <div className="p-4 text-center lg:text-left">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF]">Payment</h3>
            <ul className="text-sm space-y-2 mb-6">
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">VISA</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Momo</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Zalo Pay</Link></li>
            </ul>
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF]">Logistics</h3>
            <ul className="text-sm space-y-2">
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">SPX</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Viettel</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">J&T Express</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Grab Express</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Be</Link></li>
              <li><Link href="#" className="hover:text-[#98F5FF] transition-colors">Vill</Link></li>
            </ul>
          </div>
        </div>

        {/* Phần thông tin bản quyền và liên hệ đã được cập nhật */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 text-center text-sm space-y-6 md:space-y-15">
          <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-6 md:space-x-0">
            <div className="w-[110px] h-[100px] cover pt-4">
              <Image src="/qr-code.png" alt="QR Code" width={110} height={110} />
            </div>
            <div className="flex flex-col space-y-3">
              <div className="w-[80px] h-[40px]">
                <Image src="/app-store.png" alt="App Store" width={120} height={40} />
              </div>
              <div className="w-[80px] h-[40px] pt-1">
                <Image src="/google-play.png" alt="Google Play" width={120} height={40} />
              </div>
            </div>
          </div>
          
          <div className="md:text-right text-gray-400">
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-[#98F5FF] mb-2">
              <Link href="#" className="hover:underline">Privacy Policy</Link>
              <Link href="#" className="hover:underline">Terms of Service</Link>
              <Link href="#" className="hover:underline">Shipping Policy</Link>
              <Link href="#" className="hover:underline">RETURN AND REFUND POLICY</Link>
            </div>
            <p className="mt-2">
              © {year} UrbanFlows by Huynh Quoc Huy. All rights reserved. Country & Region: <span className="text-[#98F5FF]">Vietnam</span>
            </p>
            <p>HK.Huang Company Limited</p>
            <p>
              Address: <span className="text-[#98F5FF]">Long Xuyen City, An Giang, Vietnam</span> | Tax Code: <span className="text-[#98F5FF]">8825719470</span> | Fax: <span className="text-[#98F5FF]">0924202149</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}