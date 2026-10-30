export type LookProduct = {
  id: string; name: string; brand: string; price: number; image: string;
  sizes: readonly string[]; isNew?: boolean;
};
const clothingSizes = ["S", "M", "L", "XL"] as const;
const shoeSizes = ["40", "41", "42", "43", "44", "45", "46"] as const;
const products = {
  jordan: { id: "jordan-12", name: "Air Jordan 12 Retro", brand: "Jordan", price: 149, image: "/images/looks/jordan-12.png", sizes: shoeSizes },
  tatum: { id: "tatum-5", name: "Tatum 5 Orbit", brand: "Nike", price: 149, image: "/images/looks/tatum.png", sizes: shoeSizes, isNew: true },
  luka: { id: "luka-5", name: "Luka 5", brand: "Jordan", price: 149, image: "/images/looks/luka.png", sizes: shoeSizes },
  tee: { id: "reign-tshirt", name: "Tshirt", brand: "Nike", price: 199, image: "/images/hero/black-tshirt-front.webp", sizes: clothingSizes },
  cream: { id: "sail-sweatshirt", name: "Sweatshirt", brand: "Nike", price: 199, image: "/images/hero/cream-sweatshirt-front.webp", sizes: clothingSizes },
  green: { id: "green-sweatshirt", name: "Sweatshirt Plus", brand: "Nike", price: 199, image: "/images/hero/green-sweatshirt-front.webp", sizes: clothingSizes },
  black: { id: "black-hoodie", name: "Hoodie Black", brand: "Nike", price: 199, image: "/images/hero/black-hoodie-front.webp", sizes: clothingSizes, isNew: true },
  gray: { id: "gray-hoodie", name: "Hoodie", brand: "Nike", price: 199, image: "/images/hero/gray-hoodie-front.webp", sizes: clothingSizes },
} satisfies Record<string, LookProduct>;
export const runwayLooks: { title: string; description: string; image: string; products: LookProduct[] }[] = [
  { title: "The City Edit", description: "Charcoal layers and relaxed blue denim", image: "/images/looks/model-1.webp", products: [products.jordan, products.tee, products.cream] },
  { title: "Gallery Opening", description: "A white oversized tee and sage trousers", image: "/images/looks/model-2.webp", products: [products.tatum, products.black, products.tee] },
  { title: "Gallery Opening", description: "An olive knit sweater and brown trousers", image: "/images/looks/model-3.webp", products: [products.green, products.tatum, products.tee] },
  { title: "Studio Day", description: "A clean black tee with light denim", image: "/images/looks/model-4.webp", products: [products.black, products.jordan, products.tee] },
  { title: "Studio Day", description: "A rust sweatshirt and charcoal trousers", image: "/images/looks/model-5.webp", products: [products.cream, products.tatum, products.tee] },
  { title: "Studio Day", description: "Everyday relaxed streetwear layers", image: "/images/looks/model-6.webp", products: [products.gray, products.luka, products.tee] },
];
