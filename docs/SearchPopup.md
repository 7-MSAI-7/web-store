# SearchPopup 컴포넌트 구현 문서

## 1. 개요
SearchPopup은 웹사이트의 실시간 상품 검색 기능을 제공하는 모달 컴포넌트입니다. 
사용자가 상단 네비게이션 바의 검색 아이콘을 클릭하면 전체 화면 오버레이와 함께 검색 팝업이 표시되며, 
실시간으로 상품을 검색하고 결과를 보여줍니다.

## 2. 주요 기능
- 실시간 상품 검색: 사용자가 입력하는 즉시 검색 결과가 업데이트됩니다.
- 검색 결과 그리드 뷰: 검색된 상품들을 그리드 형태로 보여줍니다.
- 애니메이션 효과: Framer Motion을 사용하여 부드러운 진입/퇴장 애니메이션을 구현했습니다.
- 반응형 디자인: 모바일부터 데스크톱까지 모든 화면 크기에 최적화되어 있습니다.
- 검색 결과 없음 처리: 검색 결과가 없을 경우 적절한 안내 메시지를 표시합니다.

## 3. 기술 스택
- React (Next.js): 프론트엔드 프레임워크
- TypeScript: 타입 안정성을 위한 정적 타입 지원
- Framer Motion: 부드러운 애니메이션 효과 구현
- Tailwind CSS: 유틸리티 기반 스타일링
- React Icons: 아이콘 컴포넌트

## 4. 컴포넌트 구조

### Props 정의
```typescript
// 검색 팝업의 Props 인터페이스
interface SearchPopupProps {
  isOpen: boolean;      // 팝업의 표시 여부를 제어하는 상태
  onClose: () => void;  // 팝업을 닫는 함수
  products: Product[];  // 검색 대상이 되는 상품 목록
}

// 상품 데이터의 구조를 정의하는 인터페이스
interface Product {
  id: string;          // 상품의 고유 식별자
  title: string;       // 상품명
  price: number;       // 상품 가격
  discount?: number;   // 할인율 (선택적)
  image: string;       // 상품 이미지 URL
}
```

### 상태 관리
```typescript
// 검색어 상태 관리
const [searchTerm, setSearchTerm] = useState('');

// 검색 결과 상태 관리
const [searchResults, setSearchResults] = useState<Product[]>([]);
```

## 5. 주요 기능 구현

### 5.1 실시간 검색 구현
```typescript
// 검색어가 변경될 때마다 실행되는 useEffect
useEffect(() => {
  // 검색어가 비어있으면 결과 초기화
  if (searchTerm.trim() === '') {
    setSearchResults([]);
    return;
  }

  // 상품명에 검색어가 포함된 상품만 필터링
  // 대소문자 구분 없이 검색
  const results = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setSearchResults(results);
}, [searchTerm, products]);
```

### 5.2 애니메이션 효과
```typescript
// 전체 화면 오버레이 애니메이션
<motion.div
  initial={{ opacity: 0 }}    // 초기 상태: 투명
  animate={{ opacity: 1 }}    // 애니메이션 후: 불투명
  exit={{ opacity: 0 }}       // 퇴장 시: 투명
  className="fixed inset-0 bg-black bg-opacity-50 z-50"
>
  {/* 검색 팝업 컨테이너 애니메이션 */}
  <motion.div
    initial={{ y: -50, opacity: 0 }}  // 초기 상태: 위로 50px, 투명
    animate={{ y: 0, opacity: 1 }}    // 애니메이션 후: 원위치, 불투명
    exit={{ y: -50, opacity: 0 }}     // 퇴장 시: 위로 50px, 투명
    className="bg-white w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%]"
  >
```

### 5.3 반응형 디자인
- 모바일 (기본): 95% 너비
- 태블릿 (md): 90% 너비
- 데스크톱 (lg): 85% 너비
- 대형 화면 (xl): 80% 너비

## 6. 사용 방법

### 6.1 컴포넌트 임포트
```typescript
import SearchPopup from '@/components/SearchPopup';
```

### 6.2 컴포넌트 사용 예시
```typescript
// 부모 컴포넌트에서의 사용 예시
const [isSearchOpen, setIsSearchOpen] = useState(false);

// 검색 팝업 렌더링
<SearchPopup
  isOpen={isSearchOpen}
  onClose={() => setIsSearchOpen(false)}
  products={products}
/>
```

## 7. 스타일링 특징
- 전체 화면 오버레이: 반투명 검은색 배경 (bg-opacity-50)
- 둥근 모서리: 0.5rem 반경 (rounded-lg)
- 그림자 효과: 큰 그림자 (shadow-xl)
- 반응형 패딩: 화면 크기에 따라 자동 조절
- 호버 효과: 
  - 상품 카드: 그림자 증가, 색상 변경
  - 버튼: 크기 변화, 색상 변경

## 8. 접근성 고려사항
- 키보드 접근성: 
  - 검색 입력창 자동 포커스 (autoFocus)
  - 키보드로 닫기 가능
- 시맨틱 HTML: 
  - 적절한 헤딩 레벨 사용
  - 의미있는 버튼 레이블
- 색상 대비: 
  - WCAG 2.0 기준 준수
  - 충분한 텍스트 대비
- 반응형 디자인: 
  - 모든 화면 크기 지원
  - 터치 디바이스 최적화

## 9. 성능 최적화
- 검색 최적화:
  - 불필요한 검색 방지
  - 빈 검색어 처리
- 렌더링 최적화:
  - 불필요한 리렌더링 방지
  - 메모이제이션 활용
- 이미지 최적화:
  - Next.js Image 컴포넌트 사용
  - 적절한 이미지 크기 조정

## 10. 향후 개선 사항
- 검색어 디바운싱 추가
- 검색 히스토리 기능
- 자동완성 기능
- 검색 필터 추가
- 검색 결과 정렬 기능

## 11. 주의사항
- 검색어 입력 시 성능 고려
- 대량의 상품 데이터 처리 시 최적화 필요
- 모바일 환경에서의 사용성 테스트 필요
- 브라우저 호환성 확인 필요 