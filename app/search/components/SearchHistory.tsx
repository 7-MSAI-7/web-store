'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiClock, FiX } from 'react-icons/fi';

export default function SearchHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const router = useRouter();

  // 검색 히스토리 로드
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setHistory(savedHistory);
  }, []);

  // 검색어 삭제
  const removeSearchTerm = (term: string) => {
    const newHistory = history.filter(item => item !== term);
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // 검색어 클릭
  const handleSearchClick = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <FiClock className="w-4 h-4" />
        <span>최근 검색어</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((term, index) => (
          <div
            key={index}
            className="group flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
          >
            <span onClick={() => handleSearchClick(term)}>{term}</span>
            <button
              onClick={() => removeSearchTerm(term)}
              className="opacity-100"
            >
              <FiX className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 