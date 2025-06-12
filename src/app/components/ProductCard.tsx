// ProductCard.tsx
// 상품 카드 컴포넌트
// - 상품 이미지, 제목, 가격, 할인율 표시
// - 호버 시 상세 정보 표시
// - 클릭 시 상품 상세 페이지로 이동

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 상품 데이터 타입 정의
interface Product {
  id: string;
  title: string;
  price: number;
  discount?: number;
  image: string;
  category: string;
}

// ProductCard 컴포넌트 Props 타입 정의
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // 할인된 가격 계산
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    // 상품 카드 컨테이너 - 호버 효과와 그림자 적용
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* 상품 이미지 영역 */}
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 상품 정보 영역 */}
      <div className="p-4">
        {/* 상품 제목 - 클릭 시 상세 페이지로 이동 */}
        <Link href={`/category/${product.category}/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* 가격 정보 영역 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* 할인된 가격 */}
            <span className="text-lg font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {/* 할인율 표시 (있는 경우) */}
            {product.discount && (
              <span className="text-sm text-red-600">
                {product.discount}% OFF
              </span>
            )}
          </div>
          {/* 원래 가격 (할인이 있는 경우) */}
          {product.discount && (
            <span className="text-sm text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* 호버 시 표시되는 장바구니 버튼 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
} 