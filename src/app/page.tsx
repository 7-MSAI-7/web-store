/**
 * 메인 페이지 컴포넌트
 * 
 * 이 페이지는 웹사이트의 홈페이지로, 다음과 같은 주요 섹션들을 포함합니다:
 * 1. 상단 배너 (TopBanner)
 * 2. 네비게이션 바 (Navbar)
 * 3. 검색 섹션 (Search Section)
 * 4. 추천 상품 섹션 (Perfect Picks)
 * 5. 베스트셀러 섹션 (Best Sellers)
 * 6. 푸터 (Footer)
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import TopBanner from '@/components/TopBanner'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { IoSearch } from 'react-icons/io5'

// 추천 상품 데이터
// 각 상품은 id, 제목, 가격, 할인율(선택), 이미지 경로, 카테고리, 서브카테고리를 포함
const perfectPicks = [
  {
    id: "oversized-fit-cotton-t-shirt",
    title: "Oversized Fit Cotton T-shirt",
    price: 190,
    discount: 15,
    image: "/images/tshirt.jpg",
    category: "men",
    subcategory: "t-shirts"
  },
  {
    id: "button-detail-jacket",
    title: "Button-detail Jacket",
    price: 420,
    discount: 20,
    image: "/images/jacket.jpg",
    category: "women",
    subcategory: "jackets"
  },
  {
    id: "viscose-shirt-dress",
    title: "Viscose Shirt Dress",
    price: 340,
    discount: 20,
    image: "/images/dress.jpg",
    category: "women",
    subcategory: "dresses"
  },
  {
    id: "straight-regular-jeans",
    title: "Straight Regular Jeans",
    price: 220,
    discount: 15,
    image: "/images/jeans.jpg",
    category: "men",
    subcategory: "jeans"
  },
  {
    id: "cotton-twill-jacket",
    title: "Cotton Twill Jacket",
    price: 75,
    discount: 15,
    image: "/images/twill-jacket.jpg",
    category: "men",
    subcategory: "jackets"
  },
  {
    id: "linen-blend-shirt",
    title: "Linen-blend Shirt",
    price: 340,
    image: "/images/linen-shirt.jpg",
    category: "women",
    subcategory: "shirts"
  }
]

// 베스트셀러 상품 데이터
// 각 상품은 id, 제목, 가격, 이미지 경로, 카테고리, 서브카테고리를 포함
const bestSellers = [
  {
    id: "women-formal-suit",
    title: "WOMEN SOLID SLIM FIT SINGLE BREASTED 2-PIECE FORMAL SUIT",
    price: 420,
    image: "/images/formal-suit.jpg",
    category: "women",
    subcategory: "suits"
  },
  {
    id: "cotton-pique-polo",
    title: "Cotton Pique Polo Shirt",
    price: 65,
    image: "/images/polo.jpg",
    category: "men",
    subcategory: "polo-shirts"
  },
  {
    id: "hiking-jacket",
    title: "TERREX XPLORIC RAIN.RDY HIKING JACKET",
    price: 320,
    image: "/images/hiking-jacket.jpg",
    category: "men",
    subcategory: "jackets"
  }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`
    }
  }

  return (
    <main className="min-h-screen">
      {/* 상단 배너: 프로모션이나 알림을 표시 */}
      <TopBanner />
      
      {/* 네비게이션 바: 메인 메뉴와 검색 기능 */}
      <Navbar />
      
      {/* 검색 섹션 */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="text-center mb-12">
            <h1 className="text-7xl lg:text-9xl font-bold text-gray-900 mb-6">
              OUR SHOP
            </h1>
            <p className="text-2xl lg:text-4xl text-gray-600">
              Find your perfect style
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <div className="relative w-full max-w-4xl mx-auto">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-8 py-6 text-xl lg:text-2xl border-2 border-gray-300 rounded-full focus:border-black outline-none transition-colors shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoSearch size={36} />
              </button>
            </div>
          </form>

          <div className="mt-8 flex justify-center gap-4 text-xl lg:text-2xl">
            <Link
              href="/shop/men"
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Men
            </Link>
            <Link
              href="/shop/women"
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Women
            </Link>
            <Link
              href="/shop/kids"
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              Kids
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 추천 상품 섹션: 그리드 레이아웃으로 상품 카드 표시 */}
      <section className="py-24 bg-white">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
              PERFECT PICKS FOR YOU!
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 px-4">
            {perfectPicks.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 베스트셀러 섹션: 인기 상품 그리드 레이아웃 */}
      <section className="py-24 bg-gray-50">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
              BEST SELLERS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 px-4">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터: 브랜드 정보, 네비게이션 링크, 소셜 미디어 링크 */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Info */}
            <div className="space-y-6">
              <h3 className="text-4xl font-bold">OUR SHOP</h3>
              <p className="text-xl lg:text-2xl text-gray-400">
                Your trusted fashion companion
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-2xl font-semibold mb-6">Navigation</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-xl text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-xl text-gray-400 hover:text-white transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-xl text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-xl text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-2xl font-semibold mb-6">Categories</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/shop/men" className="text-xl text-gray-400 hover:text-white transition-colors">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="/shop/women" className="text-xl text-gray-400 hover:text-white transition-colors">
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="/shop/kids" className="text-xl text-gray-400 hover:text-white transition-colors">
                    Kids
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-2xl font-semibold mb-6">Newsletter</h4>
              <p className="text-xl text-gray-400 mb-4">
                Sign up to our newsletter & get 20% off
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-gray-800 text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-xl"
                >
                  SIGN UP FOR FREE
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="text-xl">All Rights Reserved By @Cosmic Studio</p>
          </div>
        </div>
      </footer>
    </main>
  )
} 