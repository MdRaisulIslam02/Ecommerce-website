export type OrbitShoe = { id: string; name: string; color: string; price: number; image: string; slug: string };
export const orbitShoes: OrbitShoe[] = [
  { id: "orbit-1", name: "Air Jordan 12 Retro", color: "Black / White", price: 149, image: "/images/orbit/shoe-1.png", slug: "air-jordan-12-retro-black-white" },
  { id: "orbit-2", name: "Luka 5", color: "Neutral / Red", price: 149, image: "/images/orbit/shoe-2.png", slug: "luka-5-neutral-red" },
  { id: "orbit-3", name: "Tatum 5 Orbit", color: "Light Gray", price: 149, image: "/images/orbit/shoe-3.png", slug: "tatum-5-orbit-light-gray" },
  { id: "orbit-4", name: "Air Jordan 12 Retro", color: "Black", price: 149, image: "/images/orbit/shoe-4.png", slug: "air-jordan-12-retro-black" },
  { id: "orbit-5", name: "Luka 5", color: "White / Black", price: 149, image: "/images/orbit/shoe-5.png", slug: "luka-5-white-black" },
  { id: "orbit-6", name: "Tatum 5 Orbit", color: "All Black", price: 149, image: "/images/orbit/shoe-6.png", slug: "tatum-5-orbit-all-black" },
  { id: "orbit-7", name: "Luka 5", color: "Royal Blue / Black", price: 149, image: "/images/orbit/shoe-7.png", slug: "luka-5-royal-blue" },
];
export const orbitSizes = [40, 41, 42, 43, 44, 45, 46] as const;
