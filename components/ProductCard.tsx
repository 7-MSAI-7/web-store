// ProductCard.tsx
// 상품 카드 컴포넌트
// - 상품 이미지, 제목, 가격, 할인율 표시
// - 호버 시 상세 정보 표시
// - 클릭 시 상품 상세 페이지로 이동

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product, UserBehaviorRequest, UserEvent } from '@/app/lib/api/types';
import { createUserBehavior } from '@/app/lib/api/endpoints';

// ProductCard 컴포넌트 Props 타입 정의
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleProductClick = async () => {
    try {
      const behavior: UserBehaviorRequest = {
        name: product.name,
        event: 'item_view' as UserEvent
      };
      await createUserBehavior(behavior);
    } catch (error) {
      console.error('Error creating user behavior:', error);
    }
  };

  return (
    <div 
      className="product-card group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={handleProductClick}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900">
              {product.price}
            </p>
            {product.seller && (
              <p className="text-sm text-gray-600">
                {product.seller}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
} 