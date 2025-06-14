'use client';

import { useState, FormEvent, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchFormProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

export default function SearchForm({ onSearch, initialValue = '' }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // initialValue가 변경될 때 검색어 업데이트
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  // 검색 실행
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="상품을 검색해보세요"
          className="w-full px-4 py-3 pl-12 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <FiSearch className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
} 