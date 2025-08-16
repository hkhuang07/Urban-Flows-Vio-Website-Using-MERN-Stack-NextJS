import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container bg-[#000005] mx-auto mt-4 px-4">
      
      {/* 1. Banner Section */}
      <section className="mb-8">
        <h2 className="text-2xl  font-bold mb-4">Live Show Banner</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#000005] gap-4">
          {/* Main Banner */}
          <div className="col-span-1 md:col-span-2 relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image
              src="/bannerdelivery.jpg"
              alt="Main promotion banner" 
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          {/* Side Banners */}
          <div className="flex flex-col gap-4">
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden">
              <Image
                src="/bannerdelivery04.jpg"
                alt="Small promotion banner 1"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden">
              <Image
                src="/bannerdelivery02.jpg"
                alt="Small promotion banner 2"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        <p className="text-center mt-4">Rotating banner display</p>
      </section>

      {/* 2. Control Panel Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Urban Flows Control Panel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Consumers */}
          <div className="bg-[#000005] border border-[#BFEFFF] p-6 rounded-lg shadow-md flex flex-col">
            {/* Header Section */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-[#98F5FF] h-14 mb-2">Consumers</h3>
              <p className="text-[#F0F8FF] text-sm">A variety of services for your daily needs.</p>
            </div>
            {/* Content Section */}
            <div className="flex-grow">
              <ul className="space-y-3 text-sm">
                <li>
                  <div className="font-medium text-[#B0E2FF] mb-1">Delivery:</div>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><Link href="#" className="hover:underline text-gray-200">Food</Link></li>
                    <li><Link href="#" className="hover:underline text-gray-200">Goods (Shopping)</Link></li>
                    <li><Link href="#" className="hover:underline text-gray-200">Delivery</Link></li>
                  </ul>
                </li>
                <li>
                  <div className="font-medium text-[#B0E2FF] mb-1">Mobility:</div>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><Link href="#" className="hover:underline text-gray-200">Transport</Link></li>
                  </ul>
                </li>
                <li>
                  <div className="font-medium text-[#B0E2FF] mb-1">Financial Services:</div>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><Link href="#" className="hover:underline text-gray-200">Payments</Link></li>
                    <li><Link href="#" className="hover:underline text-gray-200">Insurance</Link></li>
                    <li><Link href="#" className="hover:underline text-gray-200">Mobile Top-up</Link></li>
                    <li><Link href="#" className="hover:underline text-gray-200">Bills</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-700">
              <Link href="#" className="text-[#00BFFF] hover:underline block text-center font-semibold">View more services</Link>
            </div>
          </div>

          {/* Driver Partners */}
          <div className="bg-[#000005] border border-[#BFEFFF] p-6 rounded-lg shadow-md flex flex-col">
            {/* Header Section */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-[#98F5FF] h-14 mb-2">Driver Partners</h3>
              <p className="text-gray-400 text-sm">Join our team of dedicated drivers.</p>
            </div>
            {/* Content Section */}
            <div className="flex-grow">
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:underline text-gray-200">Become a Driver Partner</Link></li>
                <li><Link href="#" className="hover:underline text-gray-200">Become a Delivery Partner</Link></li>
              </ul>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-700">
              <Link href="#" className="text-[#00BFFF] hover:underline block text-center font-semibold">Learn More</Link>
            </div>
          </div>

          {/* Merchant Partners */}
          <div className="bg-[#000005] border border-[#BFEFFF] p-6 rounded-lg shadow-md flex flex-col">
            {/* Header Section */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-[#98F5FF] h-14 mb-2">Merchant Partners</h3>
              <p className="text-gray-400 text-sm">Grow your business with our platform.</p>
            </div>
            {/* Content Section */}
            <div className="flex-grow">
              <ul className="space-y-3 text-sm">
                <li>
                  <div className="font-medium text-[#B0E2FF] mb-1">Business Growth:</div>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><Link href="#" className="hover:underline text-gray-200">Sell on Urban Flows</Link></li>
                    <li><Link href="#" className="hover:underline text-gray-200">Cashless Payments</Link></li>
                    <li><Link href="#" className="hover:underline text-gray-200">Deliver with us</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-700">
              <Link href="#" className="text-[#00BFFF] hover:underline block text-center font-semibold">Get Started</Link>
            </div>
          </div>

          {/* Corporate */}
          <div className="bg-[#000005] border border-[#BFEFFF] p-6 rounded-lg shadow-md flex flex-col">
            {/* Header Section */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-[#98F5FF] h-14 mb-2">Corporate</h3>
              <p className="text-gray-400 text-sm">Tailored solutions for your business needs.</p>
            </div>
            {/* Content Section */}
            <div className="flex-grow">
              <ul className="space-y-3 text-sm">
                <li>
                  <div className="font-medium text-[#B0E2FF] mb-1">UrbanFlows For Business:</div>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><Link href="#" className="hover:underline text-gray-200">Delivery</Link></li>
                    <li><Link href="#" className="hover:underline text-gray-200">Gift Cards</Link></li>
                    <li><Link href="#" className="hover:underline text-gray-200">Advertising</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-700">
              <Link href="#" className="text-[#00BFFF] hover:underline block text-center font-semibold">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-8" />

      {/* 3. News Center Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">News Center</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* News Item 1 */}
          <div className="bg-[#000010] rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative w-full h-48 overflow-hidden">
              <Image src="/news01.jpg" alt="News Image" layout="fill" objectFit="cover" />
            </div>
            <div className="p-4 flex flex-col flex-grow text-white">
              <p className="text-xs text-gray-400">20/07/25</p>
              <h4 className="font-bold text-base mt-1 mb-2 text-white line-clamp-2">UrbanFlows uses AI to enhance personalized user experience in Vietnam</h4>
              <div className="mt-auto">
                <Link href="#" className="text-[#00BFFF] hover:underline text-sm font-semibold">Read more</Link>
              </div>
            </div>
          </div>
          {/* News Item 2 */}
          <div className="bg-[#000010] rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative w-full h-48 overflow-hidden">
              <Image src="/news02.jpg" alt="News Image" layout="fill" objectFit="cover" />
            </div>
            <div className="p-4 flex flex-col flex-grow text-white">
              <p className="text-xs text-gray-400">20/07/25</p>
              <h4 className="font-bold text-base mt-1 mb-2 text-white line-clamp-2">Grab and Da Nang Culinary Culture Association promote local food tourism</h4>
              <div className="mt-auto">
                <Link href="#" className="text-[#00BFFF] hover:underline text-sm font-semibold">Read more</Link>
              </div>
            </div>
          </div>
          {/* News Item 3 */}
          <div className="bg-[#000010] rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative w-full h-48 overflow-hidden">
              <Image src="/news03.jpg" alt="News Image" layout="fill" objectFit="cover" />
            </div>
            <div className="p-4 flex flex-col flex-grow text-white">
              <p className="text-xs text-gray-400">20/07/25</p>
              <h4 className="font-bold text-base mt-1 mb-2 text-white line-clamp-2">Hai Phong Department of Culture, Sports and Tourism boosts tourism promotion activities in Cat Ba</h4>
              <div className="mt-auto">
                <Link href="#" className="text-[#00BFFF] hover:underline text-sm font-semibold">Read more</Link>
              </div>
            </div>
          </div>
          {/* News Item 4 */}
          <div className="bg-[#000010] rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative w-full h-48 overflow-hidden">
              <Image src="/news04.jpg" alt="News Image" layout="fill" objectFit="cover" />
            </div>
            <div className="p-4 flex flex-col flex-grow text-white">
              <p className="text-xs text-gray-400">20/07/25</p>
              <h4 className="font-bold text-base mt-1 mb-2 text-white line-clamp-2">GrabMart expands daily consumer goods categories to meet at-home shopping needs</h4>
              <div className="mt-auto">
                <Link href="#" className="text-[#00BFFF] hover:underline text-sm font-semibold">Read more</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="#" className="bg-[#104E8B] text-[#F0F8FF] py-2 px-6 rounded-full font-semibold hover:bg-opacity-80 transition-colors duration-300">
            View more news
          </Link>
        </div>
      </section>
    </div>
  );
}