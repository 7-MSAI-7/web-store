import TopBanner from '@/components/TopBanner'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import MotionWrapper from '@/components/MotionWrapper'

const allProducts = [
  // Men's Collection
  {
    id: "oversized-fit-cotton-t-shirt",
    title: "Oversized Fit Cotton T-shirt",
    price: 190,
    discount: 15,
    image: "/images/tshirt.jpg",
    category: "men",
    subcategory: "t-shirts"
  },
  {
    id: "button-detail-jacket",
    title: "Button-detail Jacket",
    price: 420,
    discount: 20,
    image: "/images/jacket.jpg",
    category: "men",
    subcategory: "jackets"
  },
  {
    id: "cotton-pique-polo",
    title: "Cotton Pique Polo Shirt",
    price: 65,
    image: "/images/polo.jpg",
    category: "men",
    subcategory: "polo-shirts"
  },
  {
    id: "hiking-jacket",
    title: "TERREX XPLORIC RAIN.RDY HIKING JACKET",
    price: 320,
    image: "/images/hiking-jacket.jpg",
    category: "men",
    subcategory: "jackets"
  },
  // Women's Collection
  {
    id: "viscose-shirt-dress",
    title: "Viscose Shirt Dress",
    price: 340,
    discount: 20,
    image: "/images/dress.jpg",
    category: "women",
    subcategory: "dresses"
  },
  {
    id: "straight-regular-jeans",
    title: "Straight Regular Jeans",
    price: 220,
    discount: 15,
    image: "/images/jeans.jpg",
    category: "women",
    subcategory: "jeans"
  },
  {
    id: "cotton-twill-jacket",
    title: "Cotton Twill Jacket",
    price: 75,
    discount: 15,
    image: "/images/twill-jacket.jpg",
    category: "women",
    subcategory: "jackets"
  },
  {
    id: "women-formal-suit",
    title: "WOMEN SOLID SLIM FIT SINGLE BREASTED 2-PIECE FORMAL SUIT",
    price: 420,
    image: "/images/formal-suit.jpg",
    category: "women",
    subcategory: "suits"
  },
  // Kids' Collection
  {
    id: "kids-tshirt",
    title: "Kids Graphic T-shirt",
    price: 35,
    discount: 10,
    image: "/images/tshirt.jpg",
    category: "kids",
    subcategory: "t-shirts"
  },
  {
    id: "kids-jacket",
    title: "Kids Waterproof Jacket",
    price: 85,
    discount: 15,
    image: "/images/jacket.jpg",
    category: "kids",
    subcategory: "jackets"
  }
]

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.toLowerCase()
  const categoryProducts = allProducts.filter(product => product.category === category)

  const categoryTitle = {
    men: "Men's Collection",
    women: "Women's Collection",
    kids: "Kids' Collection",
    shop: "All Products"
  }[category] || "Products"

  return (
    <main className="min-h-screen">
      <TopBanner />
      <Navbar />

      <section className="py-16 bg-white">
        <div className="px-4 lg:px-6 xl:px-8">
          <MotionWrapper delay={0}>
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                {categoryTitle}
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600">
                Discover our latest collection
              </p>
            </div>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
            {categoryProducts.map((product, index) => (
              <MotionWrapper key={product.id} delay={index * 0.1}>
                <ProductCard {...product} />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export async function generateStaticParams() {
  return [
    { category: 'shirts' },
    { category: 'pants' },
    { category: 'accessories' },
    { category: 'men' },
    { category: 'women' },
    { category: 'kids' },
  ]
}
