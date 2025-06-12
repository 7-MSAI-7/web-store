// Navbar.tsx
// 메인 네비게이션 바 컴포넌트
// - 로고, 카테고리 메뉴, 검색, 장바구니 기능 포함
// - 반응형 디자인 적용 (모바일에서는 메뉴 숨김)
// - Tailwind CSS를 사용한 스타일링

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    // 네비게이션 바 컨테이너 - 흰색 배경과 그림자 효과
    <nav className="bg-white shadow-md">
      {/* 최대 너비 제한과 좌우 패딩 설정 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 네비게이션 바 내부 레이아웃 - Flexbox 사용 */}
        <div className="flex justify-between h-16">
          {/* 왼쪽 영역: 로고와 메뉴 */}
          <div className="flex">
            {/* 로고 영역 */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Fashion Store
              </Link>
            </div>
            {/* 메인 메뉴 영역 - 모바일에서는 숨김 */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* 각 카테고리 링크 - 호버 시 밑줄 효과 */}
              <Link href="/category/men" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                Men
              </Link>
              <Link href="/category/women" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                Women
              </Link>
              <Link href="/category/kids" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                Kids
              </Link>
              <Link href="/about" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                About
              </Link>
            </div>
          </div>
          {/* 오른쪽 영역: 검색과 장바구니 아이콘 */}
          <div className="flex items-center">
            {/* 검색 버튼 - 호버 시 배경색 변경 */}
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Search</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {/* 장바구니 버튼 - 호버 시 배경색 변경 */}
            <button className="ml-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Cart</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
 