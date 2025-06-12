export interface Product {
  id: string
  title: string
  price: number
  discount?: number
  image: string
  description: string
  sizeAndFit: {
    fit: string
    chest: string
    waist: string
    hips: string
    height: string
  }
  materialAndCare: string[]
  specifications: {
    pattern: string
    fit: string
    collar: string
    bottomClosure: string
    type: string
    fabric: string
    occasion: string
    sleeveLength: string
    frontStyling: string
  }
  completeTheLook: string
} 