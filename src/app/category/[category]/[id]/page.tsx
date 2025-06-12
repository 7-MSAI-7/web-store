import { products } from '@/data/products';
import ProductDetail from './ProductDetail';

// 정적 경로 생성을 위한 함수
export async function generateStaticParams(): Promise<Array<{ category: string; id: string }>> {
  const paths: Array<{ category: string; id: string }> = [];
  
  // 각 카테고리와 상품 ID에 대한 경로 생성
  Object.entries(products).forEach(([category, items]) => {
    items.forEach((item) => {
      paths.push({
        category,
        id: item.id,
      });
    });
  });
  
  return paths;
}

export default function ProductPage({ params }: { params: { category: string; id: string } }) {
  const { category, id } = params;
  const product = products[category as keyof typeof products]?.find(
    (item) => item.id === id
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">상품을 찾을 수 없습니다</h1>
            <a href="/" className="text-blue-600 hover:text-blue-800">
              홈으로 돌아가기
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
} 