"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Icon } from "@/components/ui/icon";
const categories = [
  { name: "All essentials", image: "/images/editorial-one.jpg", href: "/shop", photo: true },
  { name: "Hoodies", image: "/images/hero/gray-hoodie-front.webp", href: "/shop?q=hoodie" },
  { name: "Sweatshirts", image: "/images/hero/cream-sweatshirt-front.webp", href: "/shop?q=sweatshirt" },
  { name: "T-shirts", image: "/images/hero/black-tshirt-front.webp", href: "/shop?q=t-shirt" },
  { name: "Blazers", image: "/images/hero/blazer-front.webp", href: "/shop?q=blazer" },
  { name: "Sneakers", image: "/images/jordan.webp", href: "/shop?q=footwear" },
  { name: "Jordan", image: "/images/orbit/shoe-1.png", href: "/shop?q=jordan" },
  { name: "The black edit", image: "/images/hero/black-hoodie-front.webp", href: "/shop?q=black" },
  { name: "The green edit", image: "/images/hero/green-sweatshirt-front.webp", href: "/shop?q=green" },
  { name: "Nike favourites", image: "/images/black-sneaker.webp", href: "/shop?q=nike" },
];
export function CategorySlider() {
  const track = useRef<HTMLUListElement>(null);
  const gesture = useRef<{ id: number; x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [edges, setEdges] = useState({ start: true, end: false });
  function updateEdges() {
    const list = track.current;
    if (list) setEdges({ start: list.scrollLeft <= 2, end: list.scrollLeft + list.clientWidth >= list.scrollWidth - 2 });
  }
  useEffect(() => {
    const observer = new ResizeObserver(updateEdges);
    if (track.current) observer.observe(track.current);
    updateEdges();
    return () => observer.disconnect();
  }, []);
  function step() {
    const list = track.current;
    return list ? (list.firstElementChild as HTMLElement).offsetWidth + parseFloat(getComputedStyle(list).columnGap || "0") : 0;
  }
  function move(direction: number) {
    track.current?.scrollBy({ left: direction * step(), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  function startDrag(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== "mouse" || !event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    gesture.current = { id:event.pointerId, x:event.clientX, left:event.currentTarget.scrollLeft, moved:false };
  }
  function moveDrag(event: PointerEvent<HTMLUListElement>) {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) return;
    const delta = event.clientX - drag.x;
    if (!drag.moved && Math.abs(delta) < 7) return;
    if (!drag.moved) { drag.moved = true; event.currentTarget.classList.add("is-dragging"); event.currentTarget.setPointerCapture(event.pointerId); }
    event.preventDefault();
    event.currentTarget.scrollLeft = drag.left - delta;
  }
  function finishDrag(event: PointerEvent<HTMLUListElement>) {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) return;
    gesture.current = null;
    if (!drag.moved) return;
    suppressClick.current = true;
    const list = event.currentTarget;
    list.classList.remove("is-dragging");
    if (list.hasPointerCapture(event.pointerId)) list.releasePointerCapture(event.pointerId);
    list.scrollTo({ left:Math.round(list.scrollLeft / step()) * step(), behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <section className="category-section" id="shop-categories" aria-labelledby="category-title"><div className="category-section-heading"><div><p>SHOP BY CATEGORY</p><h2 id="category-title">Find your everyday.</h2></div><div className="category-arrows"><button type="button" aria-label="Previous category" disabled={edges.start} onClick={() => move(-1)}><Icon name="arrow" size={21} style={{transform:"rotate(180deg)"}} /></button><button type="button" aria-label="Next category" disabled={edges.end} onClick={() => move(1)}><Icon name="arrow" size={21} /></button></div></div>
    <ul ref={track} className="category-track" aria-label="Product categories" onScroll={updateEdges} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={(event) => { if (event.target === event.currentTarget) finishDrag(event); }} onDragStart={(event) => event.preventDefault()} onClickCapture={(event) => { if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
      {categories.map((category,index) => <li key={category.name}><Link href={category.href} className="category-link" aria-label={`Shop ${category.name}`}><span className={`category-picture ${category.photo ? "is-photo" : ""}`}><Image src={category.image} alt="" width={240} height={260} sizes="(max-width:600px) 100px, 146px" loading={index < 7 ? "eager" : "lazy"} draggable={false} /><span className="category-picture-arrow"><Icon name="arrow" size={17} /></span></span><span className="category-name">{category.name}</span></Link></li>)}
    </ul>
  </section>;
}

