/**
 * 검색 팝업 컴포넌트
 * 
 * 주요 기능:
 * 1. 실시간 상품 검색
 * 2. 검색 결과 표시
 * 3. 애니메이션 효과 (Framer Motion)
 * 4. 반응형 디자인
 * 
 * Props:
 * - isOpen: 팝업 표시 여부
 * - onClose: 팝업 닫기 함수
 * - products: 검색할 상품 목록
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose, IoSearch } from 'react-icons/io5'
import Link from 'next/link'

// 상품 인터페이스 정의
interface Product {
  id: string
  title: string
  price: number
  discount?: number
  image: string
}

// 검색 팝업 Props 인터페이스 정의
interface SearchPopupProps {
  isOpen: boolean
  onClose: () => void
  products: Product[]
}

export default function SearchPopup({ isOpen, onClose, products }: SearchPopupProps) {
  // 검색어와 검색 결과 상태 관리
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])

  // 검색어 변경 시 검색 결과 업데이트
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      return
    }

    // 상품명에 검색어가 포함된 상품 필터링
    const results = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }, [searchTerm, products])

  return (
    <AnimatePresence>
      {isOpen && (
        // 검색 팝업 오버레이
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16 lg:pt-20"
          onClick={onClose}
        >
          {/* 검색 팝업 컨테이너 */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] rounded-lg shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            {/* 검색 입력 영역 */}
            <div className="relative p-8 lg:p-12">
              <div className="w-full">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Search Products</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    <IoClose size={36} />
                  </button>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-6 lg:px-8 py-4 lg:py-6 text-2xl lg:text-3xl border-2 border-gray-300 rounded-full focus:border-black outline-none transition-colors shadow-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <IoSearch 
                    size={32} 
                    className="absolute right-6 lg:right-8 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* 검색 결과 표시 영역 */}
            {searchResults.length > 0 ? (
              <div className="border-t border-gray-200">
                <div className="p-8 lg:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/shop/${product.id}`}
                        className="group"
                        onClick={onClose}
                      >
                        <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-lg">
                          <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                            {/* Add product image here */}
                          </div>
                          <h3 className="text-xl lg:text-2xl font-medium text-gray-900 group-hover:text-black">
                            {product.title}
                          </h3>
                          <p className="mt-2 text-lg lg:text-xl text-gray-600">
                            ${product.price}
                            {product.discount && (
                              <span className="ml-2 text-lg lg:text-xl text-red-500">
                                -{product.discount}%
                              </span>
                            )}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : searchTerm && (
              // 검색 결과가 없을 때 메시지
              <div className="border-t border-gray-200">
                <div className="p-8 lg:p-12">
                  <p className="text-xl lg:text-2xl text-gray-500 text-center">
                    No products found for "{searchTerm}"
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 