"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { heroGarments, heroRailOrder } from "./hero-catalog";

type HeroSectionProps = {
  onSelect: (product: { name: string; color: string; image: string; imageIndex: number; columns: number }) => void;
};

export function HeroSection({ onSelect }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeProduct = activeIndex === null ? null : heroGarments[heroRailOrder[activeIndex]];

  return (
    <section className="hero-section interactive-hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">Premium streetwear. Discover the new collection.</h1>
      <p className="collection-label"><strong>New Collection</strong><span />Premium Streetwear</p>

      <div className="curved-rail-stage" onMouseLeave={() => setActiveIndex(null)}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActiveIndex(null); }}>
        <svg className="curved-rail" viewBox="0 0 1900 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hero-chrome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6f7f5" /><stop offset=".45" stopColor="#c2c7c7" />
              <stop offset="1" stopColor="#777c7e" />
            </linearGradient>
          </defs>
          <path d="M -30 3 Q 950 112 1930 3" fill="none" stroke="#545a59" strokeOpacity=".3" strokeWidth="16" transform="translate(0 5)" />
          <path d="M -30 3 Q 950 112 1930 3" fill="none" stroke="url(#hero-chrome)" strokeWidth="13" />
          <path d="M -30 -1 Q 950 108 1930 -1" fill="none" stroke="#ffffffe0" strokeWidth="3" />
        </svg>

        {heroRailOrder.map((productIndex, index) => {
          const product = heroGarments[productIndex];
          const position = 12.4 + index * (75.8 / 14);
          const normalizedPosition = position / 100;
          const drop = 3 + 218 * normalizedPosition * (1 - normalizedPosition);
          const active = activeIndex === index;
          const style = {
            "--piece-x": `${position}%`,
            "--piece-drop": `${drop}%`,
            "--tag-angle": `${index % 2 === 0 ? -7 : 5}deg`,
          } as CSSProperties;

          return <button key={index} type="button" style={style}
            className={`hero-piece ${active ? "is-active" : ""}`}
            aria-label={`${product.name}, ${product.color}, $199.00. View product`}
            onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)}
            onClick={() => onSelect({ name: product.name, color: product.color, image: product.front, imageIndex: 0, columns: 1 })}>
            <span className="hero-hanger" aria-hidden="true" />
            <span className="hero-garment" aria-hidden="true"><Image className="hero-view hero-view-side" src={product.side} width={400} height={700} alt="" loading="eager" sizes="(max-width: 600px) 100px, 160px" draggable={false} /><Image className="hero-view hero-view-front" src={product.front} width={450} height={700} alt="" loading="eager" sizes="(max-width: 600px) 110px, 180px" draggable={false} /></span>
            <span className="hero-price-tag" aria-hidden="true"><i />$199</span>
          </button>;
        })}
      </div>

      <div className="hero-bottom">
        <div className="hero-product-details" aria-live="polite" aria-atomic="true">
          {activeProduct ? <><strong>{activeProduct.name}</strong><span>$199.00</span></> :
            <p className="hover-hint"><span />Hover a piece · click to look closer</p>}
        </div>
        <div className="hero-copy">
          <h2>Crafted in heavyweight fleece.<br />Cut oversized. Made to last.</h2>
          <a href="#collection" className="text-link">Shop the Collection <Icon name="arrow" size={20} /></a>
        </div>
      </div>
    </section>
  );
}
