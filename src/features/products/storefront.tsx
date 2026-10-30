"use client";

import Image from "next/image";
import { formatMoney } from "@/lib/currency";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useCart } from "@/features/cart/cart-provider";
import { ShoeOrbit } from "./shoe-orbit";
import { HeroSection } from "./hero-section";
import { CollectionRail } from "./collection-rail";
import { LookSlider } from "./look-slider";
import { CustomerReviews } from "./customer-reviews";
import { CategorySlider } from "./category-slider";

export function Storefront() {
  const [selected, setSelected] = useState<{
    name: string; color: string; image: string; imageIndex: number; columns: number;
  } | null>(null);
  const [garmentSize, setGarmentSize] = useState("M");
  const [campaign, setCampaign] = useState(0);
  const [campaignPlaying, setCampaignPlaying] = useState(true);
  const [campaignVisible, setCampaignVisible] = useState(false);
  const [campaignFocused, setCampaignFocused] = useState(false);
  const campaignSection = useRef<HTMLElement>(null);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setCampaignPlaying(!motion.matches);
    updateMotion();
    motion.addEventListener("change", updateMotion);
    const observer = new IntersectionObserver(([entry]) => setCampaignVisible(entry.isIntersecting), { threshold: .2 });
    if (campaignSection.current) observer.observe(campaignSection.current);
    return () => { observer.disconnect(); motion.removeEventListener("change", updateMotion); };
  }, []);
  useEffect(() => {
    if (!campaignPlaying || !campaignVisible || campaignFocused) return;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") setCampaign((current) => (current + 1) % 2);
    }, 5000);
    return () => clearInterval(timer);
  }, [campaign, campaignPlaying, campaignVisible, campaignFocused]);
  const dialog = useRef<HTMLDialogElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const { addItems } = useCart();
  useEffect(() => { if (selected !== null && !dialog.current?.open) dialog.current?.showModal(); }, [selected]);
  return (
    <>
      <HeroSection onSelect={setSelected} />

      <CategorySlider />

      <CollectionRail onSelect={setSelected} />

      <LookSlider />

      <ShoeOrbit />

      <section className="manifesto"><p className="eyebrow">Considered in every detail.</p><h2>OBSESSED.</h2><p>We make things that work better and last longer. Our products solve real<br className="desktop-break" /> problems with clean design and honest materials.</p></section>

      <section ref={campaignSection} id="lumina-slider" className={`campaign-section campaign-${campaign}`} aria-label="Lumina eyewear campaign" aria-roledescription="carousel"
        onFocusCapture={() => setCampaignFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setCampaignFocused(false); }}>
        <Image src="/images/lumina-campaign.png" fill sizes="100vw" alt="Athlete wearing luminous orange performance sunglasses with streaks of light" className="campaign-image" />
        <div className="campaign-copy" aria-live={campaignPlaying && !campaignFocused ? "off" : "polite"}><p className="eyebrow">{campaign === 0 ? "A new perspective" : "Built for your next move"}</p><h2>{campaign === 0 ? "Lumina Slider" : "Chase the Light"}</h2><p>{campaign === 0 ? "A soft, radiant light that illuminates the soul." : "Move freely. See possibility in every direction."}</p><Link href="/shop" className="campaign-link">Shop Now <Icon name="arrow" size={17} /></Link></div>
        <div className="campaign-controls"><div>{[0, 1].map((index) => <button key={index} onClick={() => setCampaign(index)} className={campaign === index ? "active" : ""} aria-label={`Campaign slide ${index + 1}`} aria-pressed={campaign === index} />)}</div><button className="campaign-autoplay" onClick={() => setCampaignPlaying(!campaignPlaying)} aria-label={campaignPlaying ? "Pause Lumina slideshow" : "Play Lumina slideshow"}>{campaignPlaying ? "Pause" : "Play"}</button><span>0{campaign + 1} / 02</span></div>
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

      <CustomerReviews />

      <dialog className="quick-view" ref={dialog} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-labelledby="quick-view-title">
        {selected !== null && <div className="quick-view-content"><button className="icon-button quick-close" aria-label="Close quick view" onClick={() => dialog.current?.close()}><Icon name="close" /></button><div className="quick-image crop-product" style={{ backgroundImage: `url("${selected.image}")`, backgroundSize: selected.columns === 1 ? "auto 90%" : `${selected.columns * 100}% 100%`, backgroundPosition: selected.columns === 1 ? "center" : `${selected.imageIndex * 100 / (selected.columns - 1)}% center` }} /><div className="quick-details"><p className="eyebrow">Nike Sportswear</p><h2 id="quick-view-title">{selected.name}</h2><p className="muted">{selected.color} · Oversized fit</p><p className="quick-price">{formatMoney(199)}</p><p>Considered details. An easy silhouette. The layer you will reach for, again and again.</p><p className="size-label">Select size</p><div className="garment-sizes">{["XS", "S", "M", "L", "XL"].map((size) => <button key={size} onClick={() => setGarmentSize(size)} className={size === garmentSize ? "selected" : ""} aria-pressed={size === garmentSize}>{size}</button>)}</div><button className="button button-dark full-width" onClick={() => { addItems([{ id: `${selected.name}-${selected.color}-${garmentSize}`, name: `${selected.color} ${selected.name}`, price: 199, image: selected.image, size: garmentSize }]); dialog.current?.close(); }}>Add to bag <Icon name="plus" size={18} /></button></div></div>}
      </dialog>
    </>
  );
}




