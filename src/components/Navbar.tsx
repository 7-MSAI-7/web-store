/**
 * 네비게이션 바 컴포넌트
 * 
 * 주요 기능:
 * 1. 반응형 네비게이션 메뉴
 * 2. 검색 기능 (검색 페이지로 이동)
 * 3. 카테고리별 링크 (Home, Shop, Men, Women, Kids, About, Contact)
 * 
 * 사용된 기술:
 * - Framer Motion: 애니메이션 효과
 * - React Icons: 검색 아이콘
 * - Tailwind CSS: 스타일링
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { IoSearch } from 'react-icons/io5'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const router = useRouter()
  const { totalItems } = useCart()

  const handleSearchClick = () => {
    router.push('/search')
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-20 lg:h-24">
          <div className="flex items-center">
            <Link href="/" className="text-3xl lg:text-5xl font-bold text-gray-900">
              OUR SHOP
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <Link href="/" className="text-lg lg:text-xl text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/shop/shop" className="text-lg lg:text-xl text-gray-600 hover:text-gray-900">
              Shop
            </Link>
            <Link href="/shop/men" className="text-lg lg:text-xl text-gray-600 hover:text-gray-900">
              Men
            </Link>
            <Link href="/shop/women" className="text-lg lg:text-xl text-gray-600 hover:text-gray-900">
              Women
            </Link>
            <Link href="/shop/kids" className="text-lg lg:text-xl text-gray-600 hover:text-gray-900">
              Kids
            </Link>
            <Link href="/about" className="text-lg lg:text-xl text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-lg lg:text-xl text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSearchClick}
              className="text-gray-600 hover:text-gray-900"
            >
              <IoSearch size={32} className="lg:w-9 lg:h-9" />
            </motion.button>
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
              <FaShoppingCart className="h-8 w-8" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-3 py-2 text-base font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 