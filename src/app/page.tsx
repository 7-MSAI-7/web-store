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

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { IoSearch } from 'react-icons/io5'
import SkeletonCard from '@/components/SkeletonCard'

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  seller: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [perfectPicks, setPerfectPicks] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  /*
    추천 상품 데이터 조회
    method: POST /api/v1/recommendations
    사용자 행동 기반 GRU 모델 추천

    response: [ { name: string, event: string }, ...]
    -------------------------------------------------
    method: POST /api/v2/recommendations
    TWO TOWER 모델 추천

    response: [ { name: string, event: string }, ...]
  */
  useEffect(() => {
    const fetchRecommends = async () => {
      try {
        const res = await fetch('https://4.217.216.190:8000/api/v1/recommendations', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        if (!res.ok) {
          console.error('Failed to fetch recommendations')
          return
        }

        const response = await res.json()

        console.log(response.data)

        if (response.status === "completed") {
          setPerfectPicks(response.data.reduce((acc: Product[], data: Product) => {
            if (data.image && data.name && data.price && data.seller) {
              acc.push(data)
            }
            return acc
          }, []).slice(0, 40))
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error)
      }
    }

    fetchRecommends()
  }, [])

  /*
      고객 행동 기록 요청 API 
      method: GET /api/v1/customers/behaviors

      고객 행동 기록 생성 API
      method: POST /api/v1/customers/behaviors
      body: { name: string, event: string }
      event: item_view, item_like, item_add_to_cart_tap, offer_make, buy_start, buy_comp

      response: [ { name: string, event: string }, ...]
  */
  const createCustomerBehavior = async (name: string) => {
    return await fetch('https://4.217.216.190:8000/api/v1/customers/behaviors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          event: 'item_view',
        }),
      })
  }

  let interval: NodeJS.Timeout;
  const requestCreateRecommendations = () => {
    fetch('https://4.217.216.190:8000/api/v2/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    fetch('https://4.217.216.190:8000/api/v1/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then(res => res.json()).then(data => {
      console.log(data)

      clearInterval(interval)
      interval = setInterval(() => {
        fetch('https://4.217.216.190:8000/api/v1/recommendations', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }).then(res => res.json()).then(data => {
          console.log(data)

          if (data.status === "completed") {
            clearInterval(interval)
            setPerfectPicks(data.data.reduce((acc: Product[], data: Product) => {
              if (data.image && data.name && data.price && data.seller) {
                acc.push(data)
              }
              return acc
            }, []).slice(0, 40))
            setIsLoading(false)
          }
        })
      }, 1000)

    })
  }

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (searchTerm.trim()) {
  //     window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`
  //   }
  // }

  return (
    <main className="min-h-screen">
      
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
              MS AI School 7-7
            </h1>
            <p className="text-2xl lg:text-4xl text-gray-600">
              
            </p>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-4xl mx-auto">
              <input
                type="text"
                placeholder="원하는 상품을 검색해보세요!"
                className="w-full px-8 py-6 text-xl lg:text-2xl border-2 border-gray-300 rounded-full focus:border-black outline-none transition-colors shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    await createCustomerBehavior(searchTerm)
                    requestCreateRecommendations()
                  }
                }}
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoSearch size={36} />
              </button>
            </div>
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
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
              : perfectPicks.map((product, index) => (
                console.log(product.id),
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
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