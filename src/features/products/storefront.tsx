"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useCart } from "@/features/cart/cart-provider";
import { garments, looks, shoes } from "./catalog";
import { HeroSection } from "./hero-section";
import { CollectionRail } from "./collection-rail";

export function Storefront() {
  const [selected, setSelected] = useState<{
    name: string; color: string; image: string; imageIndex: number; columns: number;
  } | null>(null);
  function selectGarment(index: number) {
    setSelected({ ...garments[index], image: "/images/clothing-rail.png", imageIndex: index, columns: 11 });
  }
  const [garmentSize, setGarmentSize] = useState("M");
  const [lookIndex, setLookIndex] = useState(2);
  const [shoeIndex, setShoeIndex] = useState(0);
  const [shoeSize, setShoeSize] = useState<number | null>(null);
  const [campaign, setCampaign] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const { addItems } = useCart();
  const look = looks[lookIndex];
  const shoe = shoes[shoeIndex];
  const lookTotal = look.price + 149 + 69;
  useEffect(() => { if (selected !== null && !dialog.current?.open) dialog.current?.showModal(); }, [selected]);
  function changeLook(direction: number) { setLookIndex((index) => (index + direction + looks.length) % looks.length); }
  function addLook() {
    addItems([
      { id: `look-${lookIndex}-sweatshirt`, name: `${look.color} Sweatshirt Plus`, price: look.price, image: "/images/streetwear-looks.png", size: "M" },
      { id: "look-jordan-42", name: "Air Jordan 1", price: 149, image: "/images/jordan.webp", size: "42" },
      { id: `look-${lookIndex}-trousers`, name: "Relaxed Everyday Trousers", price: 69, image: "/images/streetwear-looks.png", size: "M" },
    ]);
  }
  return (
    <>
      <HeroSection onSelect={setSelected} />

      <CollectionRail onSelect={setSelected} />

      <section id="try-the-look" className="look-section" aria-labelledby="look-title">
        <div className="look-gallery">
          <div className="section-heading"><h2 id="look-title">Try the Look.</h2><p>Six looks, styled head to toe. Tap a pin to see the piece.</p></div>
          <div className="models-stage">
            <Image src="/images/streetwear-looks.png" width={1536} height={1024} alt="Five complete streetwear looks featuring relaxed sweatshirts, tees and trousers" sizes="(max-width: 850px) 100vw, 70vw" />
            <button className="look-pin pin-top" aria-label="View sweatshirt in this look" onClick={() => selectGarment([5, 3, 4, 0, 5, 1][lookIndex])}><span /><Icon name="plus" size={15} /></button>
            <button className="look-pin pin-bottom" aria-label="View trousers in this look" onClick={() => document.getElementById("look-items")?.scrollIntoView({ behavior: "smooth", block: "center" })}><span /><Icon name="plus" size={15} /></button>
          </div>
          <div className="look-controls"><button className="arrow-button" onClick={() => changeLook(-1)} aria-label="Previous look"><Icon name="arrow" style={{ transform: "rotate(180deg)" }} /></button><div className="look-tabs">{looks.map((item, index) => <button key={item.title} className={index === lookIndex ? "active" : ""} onClick={() => setLookIndex(index)} aria-label={`Look ${index + 1}: ${item.title}`} aria-pressed={index === lookIndex}><span>{String(index + 1).padStart(2, "0")}</span>{index === lookIndex && <b>{item.title}</b>}</button>)}</div><button className="arrow-button" onClick={() => changeLook(1)} aria-label="Next look"><Icon name="arrow" /></button></div>
          <p className="look-subtitle" aria-live="polite">{look.subtitle}</p>
        </div>
        <aside id="look-items" className="look-items">
          <div className="look-items-title"><h3>In this look</h3><span>3 Pieces</span></div>
          <div className="look-products">
            <button className="look-product" onClick={() => selectGarment([5, 3, 4, 0, 5, 1][lookIndex])}><span className="look-product-image crop-product" style={{ backgroundPosition: `${[50, 30, 40, 0, 50, 10][lookIndex]}% center` }} /><span className="look-product-info"><small>Nike · {look.color}</small><strong>Sweatshirt Plus</strong><span>$ {look.price.toFixed(2)}</span></span><Icon name="plus" size={17} /></button>
            <Link className="look-product" href="/products/air-jordan-1"><span className="look-product-image"><Image src="/images/jordan.webp" width={160} height={160} alt="Red and black Air Jordan 1" /><b className="new-badge">New</b></span><span className="look-product-info"><small>Jordan</small><strong>Air Jordan 1</strong><span>$149.00</span></span><Icon name="plus" size={17} /></Link>
            <Link className="look-product" href="/shop"><span className="look-product-image trousers-crop"><Image src="/images/streetwear-looks.png" width={500} height={333} alt="Relaxed everyday trousers" /></span><span className="look-product-info"><small>Nike Sportswear</small><strong>Everyday Trousers</strong><span>$69.00</span></span><Icon name="plus" size={17} /></Link>
          </div>
          <div className="look-summary"><div><p>Complete the look</p><small>Three pieces. One point of view.</small></div><strong>${lookTotal.toFixed(2)}</strong></div>
          <button onClick={addLook} className="button button-dark full-width">Add full look to bag <Icon name="arrow" /></button>
        </aside>
      </section>

      <section className="shoe-section" aria-labelledby="shoe-title">
        <div className="shoe-info" aria-live="polite"><p className="eyebrow">{String(shoeIndex + 1).padStart(2, "0")} / 02</p><h2 id="shoe-title">{shoe.name}</h2><p className="shoe-price">${shoe.price.toFixed(2)}</p><Link href={`/products/${shoe.slug}`} className="text-link">View details <Icon name="arrow" size={18} /></Link></div>
        <div className="shoe-orbit"><div className="orbit-line" /><Image src={shoes[1 - shoeIndex].image} width={350} height={350} alt="" className="shoe-small shoe-small-left" /><Image key={shoe.image} src={shoe.image} width={700} height={700} alt={shoe.name} sizes="(max-width: 700px) 85vw, 55vw" className="shoe-main" /><Image src={shoes[1 - shoeIndex].image} width={250} height={250} alt="" className="shoe-small shoe-small-right" /></div>
        <div className="shoe-interactions">
          <div className="orbit-control"><div className="orbit-track">{shoes.map((item, index) => <button key={item.slug} onClick={() => { setShoeIndex(index); setShoeSize(null); }} aria-label={`Show ${item.name}`} aria-pressed={shoeIndex === index} className={shoeIndex === index ? "active" : ""} />)}</div><p><span>01</span>Explore the rotation<span>02</span></p></div>
          <div className="size-selector"><p className="size-label">Select size <span>EU</span></p><div>{[40, 41, 42, 43, 44, 45, 46].map((size) => <button key={size} onClick={() => setShoeSize(size)} aria-pressed={shoeSize === size} className={shoeSize === size ? "selected" : ""}>{size}</button>)}</div><button className="shoe-add" disabled={!shoeSize} onClick={() => { if (shoeSize) addItems([{ id: `${shoe.slug}-${shoeSize}`, name: shoe.name, price: shoe.price, image: shoe.image, size: String(shoeSize) }]); }}>{shoeSize ? "Add to bag" : "Choose your size"} <Icon name="arrow" size={17} /></button></div>
        </div>
      </section>

      <section className="manifesto"><p className="eyebrow">Considered in every detail.</p><h2>OBSESSED.</h2><p>We make things that work better and last longer. Our products solve real<br className="desktop-break" /> problems with clean design and honest materials.</p></section>

      <section className={`campaign-section campaign-${campaign}`} aria-label="Lumina eyewear campaign">
        <Image src="/images/lumina-campaign.png" fill sizes="100vw" alt="Athlete wearing luminous orange performance sunglasses with streaks of light" className="campaign-image" />
        <div className="campaign-copy" aria-live="polite"><p className="eyebrow">{campaign === 0 ? "A new perspective" : "Built for your next move"}</p><h2>{campaign === 0 ? "Lumina Slider" : "Chase the Light"}</h2><p>{campaign === 0 ? "A soft, radiant light that illuminates the soul." : "Move freely. See possibility in every direction."}</p><Link href="/shop" className="campaign-link">Shop Now <Icon name="arrow" size={17} /></Link></div>
        <div className="campaign-controls"><div>{[0, 1].map((index) => <button key={index} onClick={() => setCampaign(index)} className={campaign === index ? "active" : ""} aria-label={`Campaign slide ${index + 1}`} aria-pressed={campaign === index} />)}</div><span>0{campaign + 1} / 02</span></div>
      </section>

      <section id="runway" className="editorial-section">
        <div ref={gallery} className="editorial-gallery">{[
          { src: "/images/editorial-one.jpg", title: "Find your rhythm.", tag: "The everyday edit" },
          { src: "/images/editorial-two.jpg", title: "Wear it your way.", tag: "Style without rules" },
          { src: "/images/streetwear-looks.png", title: "A fresh perspective.", tag: "Made for the everyday" },
          { src: "/images/editorial-one.jpg", title: "Move together.", tag: "New season energy" },
        ].map((item, index) => <Link href="/shop" className={`editorial-card editorial-card-${index}`} key={item.title}><Image src={item.src} fill sizes="(max-width: 700px) 80vw, 32vw" alt={item.title} /><div><p>{item.tag}</p><h3>{item.title}</h3></div><span className="editorial-arrow"><Icon name="arrow" size={20} /></span></Link>)}</div>
        <div className="editorial-bottom"><span>Made for your every day.</span><div><button className="arrow-button" aria-label="Previous stories" onClick={() => gallery.current?.scrollBy({ left: -450, behavior: "smooth" })}><Icon name="arrow" style={{ transform: "rotate(180deg)" }} /></button><button className="arrow-button" aria-label="Next stories" onClick={() => gallery.current?.scrollBy({ left: 450, behavior: "smooth" })}><Icon name="arrow" /></button></div></div>
        <div className="season-heading"><p className="eyebrow">Your next chapter starts here.</p><h2>NEW SEASON. NO LIMITS.</h2><Link className="button button-dark" href="/shop">Explore the Collection <Icon name="arrow" size={19} /></Link></div>
      </section>

      <dialog className="quick-view" ref={dialog} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-labelledby="quick-view-title">
        {selected !== null && <div className="quick-view-content"><button className="icon-button quick-close" aria-label="Close quick view" onClick={() => dialog.current?.close()}><Icon name="close" /></button><div className="quick-image crop-product" style={{ backgroundImage: `url("${selected.image}")`, backgroundSize: selected.columns === 1 ? "auto 90%" : `${selected.columns * 100}% 100%`, backgroundPosition: selected.columns === 1 ? "center" : `${selected.imageIndex * 100 / (selected.columns - 1)}% center` }} /><div className="quick-details"><p className="eyebrow">Nike Sportswear</p><h2 id="quick-view-title">{selected.name}</h2><p className="muted">{selected.color} · Oversized fit</p><p className="quick-price">$199.00</p><p>Considered details. An easy silhouette. The layer you will reach for, again and again.</p><p className="size-label">Select size</p><div className="garment-sizes">{["XS", "S", "M", "L", "XL"].map((size) => <button key={size} onClick={() => setGarmentSize(size)} className={size === garmentSize ? "selected" : ""} aria-pressed={size === garmentSize}>{size}</button>)}</div><button className="button button-dark full-width" onClick={() => { addItems([{ id: `${selected.name}-${selected.color}-${garmentSize}`, name: `${selected.color} ${selected.name}`, price: 199, image: selected.image, size: garmentSize }]); dialog.current?.close(); }}>Add to bag <Icon name="plus" size={18} /></button></div></div>}
      </dialog>
    </>
  );
}
