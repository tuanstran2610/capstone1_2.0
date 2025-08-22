'use client'

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
// Clerk removed

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Minimal header with back button and user info */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-gray-700 hover:text-accent transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Quay lại trang chủ</span>
          </Link>
          
          <div>
            <Link href="/login" className="bg-accent hover:bg-accent/90 text-white rounded-md px-4 py-2 text-sm font-medium">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
      
      {children}
      
      {/* Simple footer */}
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Fitness Studio. All rights reserved.</p>
          <div className="mt-2">
            <Link href="#" className="text-accent hover:underline mx-2">Điều khoản sử dụng</Link>
            <Link href="#" className="text-accent hover:underline mx-2">Chính sách bảo mật</Link>
            <Link href="#" className="text-accent hover:underline mx-2">Liên hệ</Link>
          </div>
        </div>
      </footer>
    </>
  );
} 