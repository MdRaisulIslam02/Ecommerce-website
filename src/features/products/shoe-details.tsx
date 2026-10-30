"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useCart } from "@/features/cart/cart-provider";
import { orbitSizes, type OrbitShoe } from "./shoe-catalog";

export function ShoeDetails({ shoe }: { shoe: OrbitShoe }) {
  const [size, setSize] = useState<number | null>(null);
  const { addItems } = useCart();
  return <section className="orbit-product-page standard-page"><Link href="/#shoe-orbit" className="text-link"><Icon name="arrow" size={17} style={{ transform: "rotate(180deg)" }} />Back to the rotation</Link><div className="orbit-product-layout"><div className="orbit-product-photo"><Image src={shoe.image} width={1200} height={1200} alt={shoe.name} sizes="(max-width: 850px) 100vw, 60vw" /></div><div className="orbit-product-description"><p className="eyebrow">The footwear collection</p><h1>{shoe.name}</h1><p className="muted">{shoe.color}</p><p className="orbit-product-page-price">${shoe.price.toFixed(2)}</p><p>Find your next everyday favorite. Select your size to add this style to your bag.</p><h2>Select size · EU</h2><div className="orbit-sizes">{orbitSizes.map((item) => <button key={item} aria-label={`EU ${item}`} aria-pressed={size === item} className={size === item ? "selected" : ""} onClick={() => setSize(item)}>{item}</button>)}</div><button className="button button-dark full-width" disabled={size === null} onClick={() => { if (size) addItems([{ id: `${shoe.id}-${size}`, name: shoe.name, price: shoe.price, image: shoe.image, size: String(size) }]); }}>{size ? "Add to bag" : "Choose your size"}<Icon name="arrow" size={20} /></button></div></div></section>;
}
