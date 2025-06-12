# Fashion Store E-commerce Website

## 프로젝트 소개
이 프로젝트는 Next.js와 Tailwind CSS를 사용하여 개발된 모던한 패션 스토어 웹사이트입니다. 사용자 친화적인 인터페이스와 반응형 디자인을 제공합니다.

## 주요 기능
- 🛍️ 카테고리별 상품 탐색 (남성, 여성, 아동)
- 🔍 실시간 상품 검색
- 🛒 장바구니 기능
- 📱 반응형 디자인
- 🎨 모던한 UI/UX

## 기술 스택
- **프론트엔드**: Next.js 14.1.0
- **스타일링**: Tailwind CSS
- **개발 언어**: TypeScript
- **패키지 관리**: npm

## 프로젝트 구조
```
src/
├── app/                    # Next.js 13+ App Router 구조
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── Navbar.tsx     # 네비게이션 바 컴포넌트
│   │   ├── Hero.tsx       # 메인 히어로 섹션
│   │   ├── ProductCard.tsx # 상품 카드 컴포넌트
│   │   └── Footer.tsx     # 푸터 컴포넌트
│   ├── category/          # 카테고리 페이지
│   │   ├── [category]/    # 동적 카테고리 라우팅
│   │   └── page.tsx       # 카테고리 메인 페이지
│   ├── shop/              # 상품 관련 페이지
│   │   └── [category]/    # 카테고리별 상품 페이지
│   ├── about/             # About 페이지
│   └── page.tsx           # 메인 페이지
└── styles/                # 전역 스타일
    └── globals.css        # Tailwind CSS 설정
```

## 시작하기

### 필수 조건
- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치 방법
1. 저장소 클론
```bash
git clone [repository-url]
cd [project-name]
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 확인
```
http://localhost:3004
```

## 주요 페이지 설명

### 메인 페이지 (/)
- 히어로 섹션: 메인 배너와 프로모션
- 카테고리 섹션: 남성, 여성, 아동 컬렉션
- 추천 상품 섹션: 베스트셀러와 퍼펙트 픽

### 카테고리 페이지 (/category/[category])
- 카테고리별 상품 목록
- 필터링 및 정렬 기능
- 상품 상세 페이지 링크

### 상품 상세 페이지 (/category/[category]/[id])
- 상품 이미지 갤러리
- 상품 정보 (가격, 설명, 사이즈, 색상)
- 장바구니 추가 기능

### About 페이지 (/about)
- 회사 소개
- 미션과 비전
- 팀 소개

## 개발 가이드

### 컴포넌트 구조
- 각 컴포넌트는 TypeScript로 작성
- Tailwind CSS 클래스를 사용한 스타일링
- 재사용 가능한 구조로 설계

### 라우팅
- Next.js App Router 사용
- 동적 라우팅으로 카테고리와 상품 페이지 구현
- SEO 최적화를 위한 메타데이터 설정

### 스타일링
- Tailwind CSS를 사용한 유틸리티 기반 스타일링
- 반응형 디자인 구현
- 커스텀 색상 및 테마 설정

## 기여하기
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스
MIT License

## 연락처
프로젝트 관리자 - [이메일 주소]

## 감사의 말
- Next.js 팀
- Tailwind CSS 팀
- 모든 기여자들 