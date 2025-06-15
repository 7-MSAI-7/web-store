'use client'

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SearchForm from './components/SearchForm';
import SearchHistory from './components/SearchHistory';
import ProductList from './components/ProductList';
import { searchProducts, createV1Recommendations, createV2Recommendations, createUserBehavior } from '@/app/lib/api/endpoints';
import type { Product } from '@/app/lib/api/types';

const ITEMS_PER_PAGE = 20;
const MAX_HISTORY_ITEMS = 5;

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 로컬 스토리지에서 검색 히스토리 로드
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(savedHistory);
  }, []);

  // URL 파라미터에서 검색어 가져오기
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    saveSearchHistory(query);
  }, [searchParams]);

  // 검색 히스토리 저장
  const saveSearchHistory = (term: string) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;

    const newHistory = [trimmedTerm, ...searchHistory.filter(item => item !== trimmedTerm)]
      .slice(0, MAX_HISTORY_ITEMS);
    
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // 검색 히스토리 삭제
  const removeSearchHistory = (term: string) => {
    const newHistory = searchHistory.filter(item => item !== term);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

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

        // 사용자 행동 기록 및 추천 API 호출
        await createUserBehavior({
          name: searchQuery,
          event: 'item_view'
        });
        createV1Recommendations();
        createV2Recommendations();
        
        const products = await searchProducts({ q: searchQuery });
        setAllProducts(products || []);
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

  // 검색어 변경 처리
  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;
    
    saveSearchHistory(trimmedTerm);
    const encodedTerm = encodeURIComponent(trimmedTerm);
    router.push(`/search?q=${encodedTerm}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* 검색 폼 */}
        <SearchForm 
          onSearch={handleSearch} 
          initialValue={searchQuery}
        />

        {/* 검색 히스토리 */}
        <SearchHistory 
          onSearch={handleSearch}
          history={searchHistory}
          onRemoveHistory={removeSearchHistory}
        />

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