import { products } from '@/data/products'
import ProductList from './ProductList'

// 모든 제품 데이터
const allProducts = [
  // Men's Collection
  {
    id: "oversized-fit-cotton-t-shirt",
    title: "Oversized Fit Cotton T-shirt",
    price: 190,
    discount: 15,
    image: "/images/tshirt.jpg",
    category: "men",
    subcategory: "t-shirt"
  },
  {
    id: "button-detail-jacket",
    title: "Button-detail Jacket",
    price: 420,
    discount: 20,
    image: "/images/jacket.jpg",
    category: "men",
    subcategory: "jacket"
  },
  {
    id: "cotton-pique-polo",
    title: "Cotton Pique Polo Shirt",
    price: 65,
    image: "/images/polo.jpg",
    category: "men",
    subcategory: "t-shirt"
  },
  {
    id: "hiking-jacket",
    title: "TERREX XPLORIC RAIN.RDY HIKING JACKET",
    price: 320,
    image: "/images/hiking-jacket.jpg",
    category: "men",
    subcategory: "jacket"
  },
  {
    id: "straight-regular-jeans",
    title: "Straight Regular Jeans",
    price: 220,
    discount: 15,
    image: "/images/jeans.jpg",
    category: "men",
    subcategory: "pants"
  },
  {
    id: "loose-jeans",
    title: "Loose Jeans",
    price: 220,
    image: "/images/jeans.jpg",
    category: "men",
    subcategory: "pants"
  },
  {
    id: "regular-fit-coated-jacket",
    title: "Regular Fit Coated Jacket",
    price: 200,
    image: "/images/jacket.jpg",
    category: "men",
    subcategory: "jacket"
  },
  {
    id: "z-ne-premium-jacket",
    title: "Z.N.E. PREMIUM FULL-ZIP HOODED TRACK JACKET",
    price: 200,
    image: "/images/jacket.jpg",
    category: "men",
    subcategory: "jacket"
  },
  {
    id: "pink-tee",
    title: "PINK TEE",
    price: 199,
    image: "/images/tshirt.jpg",
    category: "men",
    subcategory: "t-shirt"
  },
  {
    id: "camo-trefoil-tee",
    title: "CAMO TREFOIL TEE",
    price: 215,
    image: "/images/tshirt.jpg",
    category: "men",
    subcategory: "t-shirt"
  },
  {
    id: "essential-tee",
    title: "ESSENTIAL TEE",
    price: 190,
    image: "/images/tshirt.jpg",
    category: "men",
    subcategory: "t-shirt"
  },
  {
    id: "slim-fit-flared-pants",
    title: "Slim Fit Flared Twill Pants",
    price: 220,
    image: "/images/jeans.jpg",
    category: "men",
    subcategory: "pants"
  },
  {
    id: "relaxed-fit-denim-jacket",
    title: "Relaxed Fit Denim Jacket",
    price: 200,
    image: "/images/jacket.jpg",
    category: "men",
    subcategory: "jacket"
  },
  {
    id: "city-escape-cargo-pants",
    title: "CITY ESCAPE PREMIUM CARGO PANTS",
    price: 220,
    image: "/images/jeans.jpg",
    category: "men",
    subcategory: "pants"
  }
]

const subcategories = {
  men: ["All", "T-Shirt", "Jacket", "Pants"],
  women: ["All", "Dress", "Jacket", "Pants"],
  kids: ["All", "T-Shirt", "Jacket", "Pants"]
}

export async function generateStaticParams() {
  return Object.keys(products).map((category) => ({
    category,
  }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryProducts = products[params.category] || [];
  return <ProductList products={categoryProducts} />;
} 