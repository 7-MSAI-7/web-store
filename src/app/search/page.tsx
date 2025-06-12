'use client'
export const dynamic = 'force-dynamic'

import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import TopBanner from '@/components/TopBanner'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import { IoSearch } from 'react-icons/io5'

// 모든 제품 데이터
const allProducts = [
  // Men's Collection
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
    category: "men",
    subcategory: "jackets"
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
  },

  // Women's Collection
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
    category: "women",
    subcategory: "jeans"
  },
  {
    id: "cotton-twill-jacket",
    title: "Cotton Twill Jacket",
    price: 75,
    discount: 15,
    image: "/images/twill-jacket.jpg",
    category: "women",
    subcategory: "jackets"
  },
  {
    id: "women-formal-suit",
    title: "WOMEN SOLID SLIM FIT SINGLE BREASTED 2-PIECE FORMAL SUIT",
    price: 420,
    image: "/images/formal-suit.jpg",
    category: "women",
    subcategory: "suits"
  },

  // Kids' Collection
  {
    id: "kids-tshirt",
    title: "Kids Graphic T-shirt",
    price: 35,
    discount: 10,
    image: "/images/tshirt.jpg",
    category: "kids",
    subcategory: "t-shirts"
  },
  {
    id: "kids-jacket",
    title: "Kids Waterproof Jacket",
    price: 85,
    discount: 15,
    image: "/images/jacket.jpg",
    category: "kids",
    subcategory: "jackets"
  }
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const query = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(query)
  
  // 검색어에 따라 상품 필터링
  const searchResults = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 컴포넌트 마운트 시 검색창에 자동 포커스
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <main className="min-h-screen">
      <TopBanner />
      <Navbar />

      <section className="py-16 bg-white">
        <div className="px-4 lg:px-6 xl:px-8">
          {/* 검색 입력 영역 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <form onSubmit={handleSearch} className="relative max-w-4xl mx-auto">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-8 py-6 text-2xl lg:text-3xl border-2 border-gray-300 rounded-full focus:border-black outline-none transition-colors shadow-lg"
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
          </motion.div>

          {/* 검색 결과 영역 */}
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Search Results
              </h1>
              <p className="text-2xl text-gray-600">
                {searchResults.length} results for "{searchTerm}"
              </p>
            </motion.div>
          )}

          {searchTerm && searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
              {searchResults.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          ) : searchTerm && (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-600">
                No products found for "{searchTerm}"
              </p>
              <p className="mt-4 text-xl lg:text-2xl text-gray-500">
                Try different keywords or browse our categories
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 
