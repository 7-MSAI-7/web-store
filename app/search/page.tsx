'use client'

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchForm from './components/SearchForm';
import SearchHistory from './components/SearchHistory';
import ProductList from './components/ProductList';
import { searchProducts } from '@/app/lib/api/endpoints';
import type { Product } from '@/app/lib/api/types';

const ITEMS_PER_PAGE = 20;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const searchQuery = searchParams.get('q') || '';

  // 클라이언트 사이드 페이지네이션
  const { products, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

    return {
      products: paginatedProducts,
      totalPages
    };
  }, [allProducts, currentPage]);

  // 검색 실행
  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery) return;

      try {
        setLoading(true);
        setError(null);
        setCurrentPage(1); // 검색어가 변경되면 첫 페이지로 리셋

        // endpoints.ts에서 정의한 searchProducts 함수 사용
        const data = await searchProducts({ q: searchQuery });
        setAllProducts(data || []);

        // 검색어 저장
        if (searchQuery.trim()) {
          const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
          const newHistory = [searchQuery, ...history.filter((item: string) => item !== searchQuery)]
            .slice(0, 5);
          localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        }
      } catch (err) {
        setError('상품을 불러오는 중 오류가 발생했습니다.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* 검색 폼 */}
        <SearchForm />

        {/* 검색 히스토리 */}
        <SearchHistory />

        {/* 검색 결과 */}
        <div className="mt-8">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">검색 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : searchQuery ? (
            <>
              <div className="mb-4 text-gray-600">
                검색어 "{searchQuery}"에 대한 {allProducts.length}개의 결과
              </div>
              <ProductList
                products={products}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-8 text-gray-600">
              검색어를 입력해주세요
            </div>
          )}
        </div>
      </div>
    </main>
  );
}