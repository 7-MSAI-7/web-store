'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product, UserEvent } from '@/app/lib/api/types';
import { createUserBehavior, createV1Recommendations, createV2Recommendations } from '@/app/lib/api/endpoints';

interface ProductListProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductList({ 
  products, 
  currentPage, 
  totalPages, 
  onPageChange 
}: ProductListProps) {
  const [loading, setLoading] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  // 상품 좋아요 처리
  const handleLike = async (product: Product) => {
    if (!product.id) return;
    
    try {
      setLoading(true);
      await createUserBehavior({ 
        name: product.name, 
        event: 'item_like' as UserEvent 
      });
      
      // 좋아요 상태 토글
      setLikedProducts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(product.id!)) {
          newSet.delete(product.id!);
        } else {
          newSet.add(product.id!);
        }
        return newSet;
      });

      // 추천 상품 업데이트
      await Promise.all([
        createV1Recommendations(),
        createV2Recommendations()
      ]);
    } catch (error) {
      console.error('Error handling like:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            이전
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}

      {/* 상품 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-start gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* 상품 이미지 */}
            <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 128px"
              />
            </div>

            {/* 상품 정보 */}
            <div className="flex-grow min-w-0">
              <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 truncate">
                {product.seller}
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                {product.price}
              </p>
            </div>

            {/* 좋아요 버튼 */}
            <button
              onClick={() => handleLike(product)}
              className={`flex-shrink-0 p-2 transition-colors ${
                product.id && likedProducts.has(product.id)
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
              }`}
              aria-label={product.id && likedProducts.has(product.id) ? '좋아요 취소' : '좋아요'}
            >
              <svg
                className="w-6 h-6"
                fill={product.id && likedProducts.has(product.id) ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 하단 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            이전
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
} 