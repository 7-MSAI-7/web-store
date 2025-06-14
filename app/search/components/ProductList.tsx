'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/app/lib/api/types';
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

  // 상품 좋아요 처리
  const handleLike = async (product: Product) => {
    try {
      setLoading(true);
      await createUserBehavior({ name: product.name, event: 'item_like' });
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
      {/* 상품 목록 */}
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* 상품 이미지 */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={`${product.image}`}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>

            {/* 상품 정보 */}
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{product.seller}</p>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                {product.price}
              </p>
            </div>

            {/* 좋아요 버튼 */}
            <button
              onClick={() => handleLike(product)}
              disabled={loading}
              className="flex-shrink-0 p-2 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50"
            >
              ❤️
            </button>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
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