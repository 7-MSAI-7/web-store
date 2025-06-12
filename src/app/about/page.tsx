// About.tsx
// 회사 소개 페이지 컴포넌트
// - 회사 소개, 미션, 비전, 팀 소개 섹션 포함
// - 반응형 디자인 적용
// - Tailwind CSS를 사용한 스타일링

import React from 'react';

export default function About() {
  return (
    // 메인 컨테이너 - 최대 너비 제한과 패딩 설정
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 히어로 섹션 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          우리는 패션의 미래를 만들어가는 혁신적인 브랜드입니다.
        </p>
      </div>

      {/* 회사 소개 섹션 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">
            2024년에 설립된 우리 회사는 지속 가능한 패션을 추구하며, 
            고객들에게 최고의 제품과 서비스를 제공하기 위해 노력하고 있습니다.
          </p>
        </div>
      </div>

      {/* 미션과 비전 섹션 */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* 미션 */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-600">
            지속 가능한 패션을 통해 더 나은 미래를 만들어갑니다.
            우리는 환경을 생각하는 제품과 서비스를 제공합니다.
          </p>
        </div>
        {/* 비전 */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
          <p className="text-gray-600">
            글로벌 패션 시장을 선도하는 혁신적인 브랜드가 되는 것입니다.
            우리는 지속적인 혁신과 성장을 추구합니다.
          </p>
        </div>
      </div>

      {/* 팀 소개 섹션 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* 팀원 1 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          {/* 팀원 2 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900">Jane Smith</h3>
            <p className="text-gray-600">Creative Director</p>
          </div>
          {/* 팀원 3 */}
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900">Mike Johnson</h3>
            <p className="text-gray-600">Head of Design</p>
          </div>
        </div>
      </div>

      {/* 연락처 섹션 */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-8">
          더 자세한 정보가 필요하신가요? 언제든지 연락주세요.
        </p>
        <a
          href="mailto:contact@fashionstore.com"
          className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
} 