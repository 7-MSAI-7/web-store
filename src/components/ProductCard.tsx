/**
 * 상품 카드 컴포넌트
 * 
 * 주요 기능:
 * 1. 상품 이미지, 제목, 가격 표시
 * 2. 할인율이 있는 경우 할인 가격 표시
 * 3. 호버 시 애니메이션 효과
 * 4. 구매 버튼
 * 
 * Props:
 * - id: 상품 고유 식별자
 * - title: 상품명
 * - price: 원래 가격
 * - discount: 할인율 (선택사항)
 * - image: 상품 이미지 URL
 * - category: 상품 카테고리
 * - subcategory: 상품 서브카테고리
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// 상품 카드 Props 인터페이스 정의
interface ProductCardProps {
  id: string
  title: string
  price: number
  discount?: number
  image: string
  category: string
  subcategory: string
}

export default function ProductCard({ id, title, price, discount, image, category, subcategory }: ProductCardProps) {
  // 할인된 가격 계산
  const discountedPrice = discount ? price * (1 - discount / 100) : price

  return (
    // 상품 카드 컨테이너
    // 호버 시 위로 살짝 올라가는 애니메이션 적용
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-lg overflow-hidden"
    >
      <Link href={`/category/${category}/${id}`}>
        {/* 상품 이미지 영역 */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* 할인 배지 (할인율이 있는 경우에만 표시) */}
          {discount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              -{discount}%
            </div>
          )}
        </div>

        {/* 상품 정보 영역 */}
        <div className="p-6 pb-24">
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
            {title}
          </h3>
          {/* 가격 정보 */}
          <div className="flex items-center space-x-2">
            <span className="text-xl lg:text-2xl font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {/* 할인 전 가격 (할인율이 있는 경우에만 표시) */}
            {discount && (
              <span className="text-lg lg:text-xl text-gray-500 line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* 구매 버튼 */}
        <div className="absolute bottom-6 left-6 right-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gray-900 text-white py-3 rounded-full text-lg lg:text-xl font-medium transition-colors hover:bg-gray-800"
          >
            Buy Now
          </motion.button>
        </div>
      </Link>
    </motion.div>
  )
} 