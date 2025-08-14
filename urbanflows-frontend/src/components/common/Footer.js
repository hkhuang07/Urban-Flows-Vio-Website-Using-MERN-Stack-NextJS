import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#000624] text-white pt-12 pb-7">
      <div className="container mx-auto px-4">
        {/* Phần 5 cột thông tin */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 border-b border-gray-700 pb-8">
          {/* Cột 1: Introduce */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF]">Introduce</h3>
            <p className="text-sm">
              Urban Flows is a multi-function website. There are several
              functions including: sales, booking, delivery...
            </p>
          </div>
          {/* Cột 2: Customer Service */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF]">
              Customer Service
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Urban Flows Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Urban Flows Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Urban Flows Mall
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  How To Buy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  How To Sell
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  How To Book
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Payment
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Retrun and Refund
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Warranty Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* Cột 3: About Urban Flows */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF]">
              About Urban Flows
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Urban Flows Carrer
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Urban Flows Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Urban Flows Mall
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Sell Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Flash Deals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Media Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Cột 4: Follow Urban Flows */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF]">
              Follow Urban Flows
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Github
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
          {/* Cột 5: Payment & Delivery */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF]">Payment</h3>
            <ul className="text-sm space-y-2 mb-6">
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  VISA
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Momo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Zalo Pay
                </Link>
              </li>
            </ul>
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF]">Logistics</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  SPX
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Viettel
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  J&T Express
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Grab Express
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Be
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {" "}
                  Vill
                </Link>
              </li>
            </ul>
          </div>
          {/* Cột 6: Download Apps */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-[#98F5FF]">
              Download Apps
            </h3>
            <div className="flex flex-row items-center space-x-4">
              <Image
                src="/qr-code.png"
                alt="QR Code"
                width={110}
                height={110}
                className="w-[110px] h-[110px]"
              />
              <div className="flex flex-col space-y-2">
                <Image
                  src="/app-store.png"
                  alt="App Store"
                  width={120}
                  height={40}
                  className="w-[120px] h-[40px]"
                />
                <Image
                  src="/google-play.png"
                  alt="Google Play"
                  width={120}
                  height={40}
                  className="w-[120px] h-[40px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Phần thông tin bản quyền và liên hệ */}
        <div className="mt-8 text-center text-sm space-y-2">
          {/* Thông tin pháp lý */}
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              Shipping Policy
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              RETURN AND REFUND POLICY
            </Link>
          </div>
          {/* Bản quyền */}
          <p>
            © {year} UrbanFlows by Huynh Quoc Huy. All rights reserved. Country
            & Region: Vietnam
          </p>
          <p>HK.Huang Company Limited</p>
          <p>
            Address: Long Xuyen City, An Giang, Vietnam | Tax Code: 8825719470 |
            Fax: 0924202149
          </p>
        </div>
      </div>
    </footer>
  );
}
