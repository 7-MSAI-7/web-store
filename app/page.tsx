'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Link from 'next/link'
import { IoSearch } from 'react-icons/io5'
import SkeletonCard from '../components/SkeletonCard'
import { useRouter } from 'next/navigation'
import { createUserBehavior, createV1Recommendations, createV2Recommendations } from '@/app/lib/api/endpoints'
import { Product } from './lib/api/types'

export default function Home() {
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        // 추천 API 호출
        const [v1Products, v2Products] = await Promise.all([
          createV1Recommendations(),
          createV2Recommendations()
        ]);
        
        let recommendedProducts: Product[] = []

        // V1 추천 상품 처리
        recommendedProducts = recommendedProducts.concat(v1Products.reduce((acc: Product[], data: Product) => {
          if (data.image && data.name && data.price && data.seller && !data.image.startsWith('https://')) {
            acc.push(data)
          }
          return acc
        }, []))

        // V2 추천 상품 처리
        recommendedProducts = recommendedProducts.concat(v2Products.reduce((acc: Product[], data: Product) => {
          if (data.image && data.name && data.price && data.seller && !data.image.startsWith('https://')) {
            acc.push(data)
          }
          return acc
        }, []))
  
        // 중복 제거 및 랜덤 정렬
        recommendedProducts = recommendedProducts.filter((product, index, self) =>
          index === self.findIndex((t) => t.id === product.id)
        )
        recommendedProducts = recommendedProducts.sort(() => Math.random() - 0.5)
        recommendedProducts = recommendedProducts.slice(0, 40)

        setProducts(recommendedProducts)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching recommendations:', error)
      }
    }

    fetchRecommendedProducts()
  }, [])


  return (
    <main className="min-h-screen">
      
      {/* 검색 섹션 */}
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="text-center">
            <h1 className="text-7xl lg:text-9xl font-bold text-gray-900 mb-6">
              MS AI School 7-7
            </h1>
            <p className="text-2xl lg:text-4xl text-gray-600">
              
            </p>
          </div>

          {/* 검색 폼 */}
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!searchTerm.trim()) return;
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
          }}>
            <div className="relative">
              <div className="relative w-full max-w-4xl mx-auto">
                <input
                  type="text"
                  placeholder="원하는 상품을 검색해보세요!"
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
            </div>
          </form>
        </motion.div>
      </section>

      {/* 추천 상품 섹션: 그리드 레이아웃으로 상품 카드 표시 */}
      <section className="bg-white">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-6xl lg:text-7xl font-bold text-gray-900">
              {/** 문구 작성**/}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-4 xl:grid-cols-8 gap-8 lg:gap-12 px-4">
            {isLoading
              ? Array.from({ length: 16 }).map((_, index) => <SkeletonCard key={index} />)
              : products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
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
              <h3 className="text-4xl font-bold">따라買 (따라사)</h3>
              <p className="text-xl lg:text-2xl text-gray-400">
                
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
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="text-xl">All Rights Reserved By 따라사</p>
          </div>
        </div>
      </footer>
    </main>
  )
} 