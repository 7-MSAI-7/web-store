export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
}

export const products: Record<string, Product[]> = {
  men: [
    {
      id: 'oversized-fit-cotton-t-shirt',
      title: 'Oversized Fit Cotton T-Shirt',
      price: 29.99,
      image: '/images/products/tshirt.jpg',
      category: 'men',
      subcategory: 't-shirts'
    },
    // ... 다른 상품들
  ],
  women: [
    // ... 여성 상품들
  ],
  // ... 다른 카테고리들
}; 