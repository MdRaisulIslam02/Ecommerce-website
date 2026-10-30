"use client";

import Image from "next/image";
import { formatMoney } from "@/lib/currency";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroGarments } from "./hero-catalog";

const collectionOrder = [2, 0, 1, 3, 4, 5, 2, 1, 3, 4] as const;
type ProductSelection = { name: string; color: string; image: string; imageIndex: number; columns: number };

export function CollectionRail({ onSelect }: { onSelect: (product: ProductSelection) => void }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  const rackRef = useRef<HTMLDivElement>(null);
  const swings = useRef<(HTMLSpanElement | null)[]>([]);
  const motion = useRef(collectionOrder.map(() => ({ angle: 0, velocity: 0 })));
  const activeProduct = activeIndex === null ? null : heroGarments[collectionOrder[activeIndex]];

  function activate(index: number | null) {
    if (activeRef.current === index) return;
    activeRef.current = index;
    setActiveIndex(index);
    if (index !== null) {
      // A small, damped impulse makes nearby hangers react to the selected piece.
      motion.current.forEach((piece, i) => {
        const distance = Math.abs(i - index);
        if (distance > 0 && distance <= 2) piece.velocity += (i < index ? -1 : 1) * 2.1 / distance;
      });
    }
  }

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousTime = 0;
    let visible = false;
    const animate = (now: number) => {
      const dt = previousTime ? Math.min((now - previousTime) / 1000, .035) : 0;
      previousTime = now;
      const time = now / 1000;
      motion.current.forEach((piece, index) => {
        piece.velocity += (-7.5 * piece.angle - 3.1 * piece.velocity) * dt;
        piece.angle += piece.velocity * dt;
        const phase = index * 1.79;
        const breeze = Math.sin(time * (.78 + index * .017) + phase) * .65
          + Math.sin(time * 1.37 + phase * .63) * .28;
        const amplitude = activeRef.current === index ? .16 : 1;
        const angle = (breeze + piece.angle) * amplitude;
        if (swings.current[index]) swings.current[index]!.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      });
      frame = requestAnimationFrame(animate);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (visible && !reducedMotion.matches) frame = requestAnimationFrame(animate);
      else swings.current.forEach((node) => { if (node) node.style.transform = ""; });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { rootMargin: "80px" });
    if (rackRef.current) observer.observe(rackRef.current);
    reducedMotion.addEventListener("change", update);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); reducedMotion.removeEventListener("change", update); };
  }, []);

  return <section id="collection" className="collection-section live-collection" aria-label="The fleece collection">
    <p className="collection-label"><strong>New Collection</strong><span />Premium Streetwear</p>
    <div className="collection-scene">
      <div className="collection-straight-rail" aria-hidden="true"><span /><span /></div>
      <div ref={rackRef} className="collection-rack" onMouseLeave={() => activate(null)}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) activate(null); }}>
        {collectionOrder.map((productIndex, index) => {
          const product = heroGarments[productIndex];
          return <button type="button" key={index}
            className={`collection-piece ${activeIndex === index ? "is-active" : ""}`}
            aria-label={`${product.name}, ${product.color}, ${formatMoney(199)}. View product`}
            onMouseEnter={() => activate(index)} onFocus={() => activate(index)}
            onClick={() => onSelect({ name: product.name, color: product.color, image: product.front, imageIndex: 0, columns: 1 })}>
            <span className="collection-swing" ref={(node) => { swings.current[index] = node; }}>
              <Image className="collection-view collection-side" src={product.side} width={420} height={900} alt="" sizes="(max-width: 600px) 110px, 13vw" draggable={false} />
              <Image className="collection-view collection-front" src={product.front} width={600} height={900} alt="" sizes="(max-width: 600px) 240px, 25vw" draggable={false} />
              <span className="collection-price-tag" aria-hidden="true"><i />{formatMoney(199, 0)}</span>
            </span>
          </button>;
        })}
      </div>
    </div>
    <div className="collection-copy">
      <h2 aria-live="polite" aria-atomic="true">{activeProduct ? activeProduct.name : "Crafted in heavyweight fleece. Cut oversized. Made to last."}</h2>
      <Link href="/shop" className="button button-light">Shop the Collection</Link>
    </div>
  </section>;
}

