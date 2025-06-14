'use client';

import { FiClock, FiX } from 'react-icons/fi';

interface SearchHistoryProps {
  onSearch: (term: string) => void;
  history: string[];
  onRemoveHistory: (term: string) => void;
  maxItems?: number;
}

export default function SearchHistory({ 
  onSearch, 
  history,
  onRemoveHistory,
  maxItems = 5 
}: SearchHistoryProps) {
  // 검색어 삭제
  const removeSearchTerm = (term: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onRemoveHistory(term);
  };

  // 검색어 클릭
  const handleSearchClick = (term: string) => {
    onSearch(term);
  };

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <FiClock className="w-4 h-4" />
        <span>최근 검색어</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.slice(0, maxItems).map((term) => (
          <button
            key={term}
            onClick={() => handleSearchClick(term)}
            className="group flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            <span>{term}</span>
            <span
              onClick={(e) => removeSearchTerm(term, e)}
            >
              <FiX className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 