"use client";
import Image from "next/image";
import { formatMoney } from "@/lib/currency";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { heroGarments } from "./hero-catalog";
import { shoes } from "./catalog";
import { useCart } from "@/features/cart/cart-provider";
const categories = ["Hoodies", "Sweatshirts", "T-shirts", "Jackets", "Footwear"];
const products = [
  ...heroGarments.map((item, index) => ({ id: `garment-${index}`, name: item.name === "Blazzer" ? "Tailored Blazer" : item.name, color: item.color, price: 199, image: item.front, back: item.back, brand: "Nike", category: ["Jackets", "Hoodies", "Hoodies", "Sweatshirts", "Sweatshirts", "T-shirts"][index], slug: "club-fleece-hoodie", footwear: false })),
  ...shoes.map((item, index) => ({ ...item, id: item.slug, back: null, color: "Everyday performance", brand: index === 0 ? "Jordan" : "Nike", category: "Footwear", footwear: true })),
];
const brands = [...new Set(products.map((item) => item.brand))];
const priceLimit = 250;
export function ShopCollection({ initialSearch }: { initialSearch: string }) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setCategories] = useState<string[]>([]);
  const [selectedBrands, setBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(priceLimit);
  const [sort, setSort] = useState("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const filterCount = selectedCategories.length + selectedBrands.length + Number(minPrice !== 0 || maxPrice !== priceLimit);
  const filtered = products.filter((item) => (!selectedCategories.length || selectedCategories.includes(item.category)) && (!selectedBrands.length || selectedBrands.includes(item.brand)) && item.price >= minPrice && item.price <= maxPrice && `${item.name} ${item.color} ${item.brand} ${item.category}`.toLowerCase().includes(search.trim().toLowerCase())).sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "name" ? a.name.localeCompare(b.name) : 0);
  useEffect(() => {
    if (!drawerOpen) return;
    const modal = drawer.current; modal?.showModal();
    const previous = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; modal?.close(); };
  }, [drawerOpen]);
  function toggle(value: string, current: string[], update: (next: string[]) => void) { update(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]); }
  function clearFilters() { setCategories([]); setBrands([]); setMinPrice(0); setMaxPrice(priceLimit); setBrandSearch(""); }
  function closeDrawer() { setDrawerOpen(false); trigger.current?.focus(); }
  function filters() { return <>
    <div className="shop-filter-heading"><h2>Filters {filterCount > 0 && <span>{filterCount}</span>}</h2><button onClick={clearFilters} disabled={!filterCount}>Reset all</button></div>
    <fieldset className="shop-filter-group"><legend>Category</legend>{categories.map((category) => <label className="shop-check" key={category}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggle(category, selectedCategories, setCategories)} /><span>{category}</span><small>{products.filter((item) => item.category === category).length}</small></label>)}</fieldset>
    <fieldset className="shop-filter-group"><legend>Price range <span>BDT</span></legend>
      <div className="shop-price-inputs"><label>Min price<span>৳<input aria-label="Minimum price" type="number" min={0} max={maxPrice} value={minPrice} onChange={(event) => setMinPrice(Math.max(0, Math.min(maxPrice, Number(event.target.value))))} /></span></label><span className="shop-price-dash">—</span><label>Max price<span>৳<input aria-label="Maximum price" type="number" min={minPrice} max={priceLimit} value={maxPrice} onChange={(event) => setMaxPrice(Math.min(priceLimit, Math.max(minPrice, Number(event.target.value))))} /></span></label></div>
      <label className="shop-range-label">Minimum <span>{formatMoney(minPrice, 0)}</span><input aria-label="Minimum price slider" type="range" min={0} max={priceLimit} value={minPrice} onChange={(event) => setMinPrice(Math.min(maxPrice, Number(event.target.value)))} /></label>
      <label className="shop-range-label">Maximum <span>{formatMoney(maxPrice, 0)}</span><input aria-label="Maximum price slider" type="range" min={0} max={priceLimit} value={maxPrice} onChange={(event) => setMaxPrice(Math.max(minPrice, Number(event.target.value)))} /></label>
    </fieldset>
    <fieldset className="shop-filter-group"><legend>Brand</legend><label className="shop-brand-search"><Icon name="search" size={16} /><input aria-label="Search brands" placeholder="Search brands" value={brandSearch} onChange={(event) => setBrandSearch(event.target.value)} /></label>{brands.filter((brand) => brand.toLowerCase().includes(brandSearch.trim().toLowerCase())).map((brand) => <label className="shop-check" key={brand}><input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggle(brand, selectedBrands, setBrands)} /><span>{brand}</span><small>{products.filter((item) => item.brand === brand).length}</small></label>)}{!brands.some((brand) => brand.toLowerCase().includes(brandSearch.trim().toLowerCase())) && <p className="shop-no-brand">No matching brands.</p>}</fieldset>
    <div className="shop-sidebar-note"><span>THE EVERYDAY COLLECTION</span><p>Good pieces.<br />On repeat.</p><small>Considered style, from head to toe.</small></div>
  </>; }
  return <section className="shop-collection">
    <div className="shop-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Shop</span></div>
    <header className="shop-intro"><div><p className="eyebrow">THE EVERYDAY COLLECTION</p><h1>Find your next favourite.</h1><p>Easy layers. Everyday icons. Made to move with you.</p></div><span className="shop-intro-index">01 — THE ESSENTIALS</span></header>
    <div className="shop-collection-layout"><aside className="shop-filter-sidebar" aria-label="Filter products">{filters()}</aside><div className="shop-results">
      <div className="shop-toolbar"><p aria-live="polite"><strong>{filtered.length}</strong> products</p><label className="shop-product-search"><Icon name="search" size={18} /><input type="search" aria-label="Search products" placeholder="Search the collection" value={search} onChange={(event) => setSearch(event.target.value)} /></label><button className="shop-mobile-filter" ref={trigger} aria-haspopup="dialog" onClick={() => setDrawerOpen(true)}><Icon name="menu" size={18} /> Filters {filterCount > 0 && <span>{filterCount}</span>}</button><label className="shop-sort">Sort by<select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option></select></label></div>
      {(filterCount > 0 || search) && <div className="shop-active-filters">{selectedCategories.map((category) => <button key={category} onClick={() => toggle(category, selectedCategories, setCategories)}>{category}<Icon name="close" size={13} /></button>)}{selectedBrands.map((brand) => <button key={brand} onClick={() => toggle(brand, selectedBrands, setBrands)}>{brand}<Icon name="close" size={13} /></button>)}{(minPrice !== 0 || maxPrice !== priceLimit) && <button onClick={() => { setMinPrice(0); setMaxPrice(priceLimit); }}>{formatMoney(minPrice, 0)} – {formatMoney(maxPrice, 0)}<Icon name="close" size={13} /></button>}{search && <button onClick={() => setSearch("")}>Search: {search}<Icon name="close" size={13} /></button>}</div>}
      <div className="shop-product-grid">{filtered.map((item, index) => <ShopProductCard key={item.id} item={item} eager={index < 3} />)}</div>
      {!filtered.length && <div className="shop-empty"><Icon name="search" size={36} /><h2>No pieces found.</h2><p>Try a wider price range or a different filter.</p><button onClick={() => { clearFilters(); setSearch(""); }}>Clear all filters <Icon name="arrow" size={18} /></button></div>}
      {filtered.length > 0 && <div className="shop-results-end">You’ve seen all {filtered.length} pieces.<span>Find something you’ll wear on repeat.</span></div>}
    </div></div>
    <dialog ref={drawer} className="shop-filter-drawer" aria-label="Product filters" onCancel={(event) => { event.preventDefault(); closeDrawer(); }} onClose={() => setDrawerOpen(false)}><div className="shop-drawer-title"><span>REFINE YOUR SELECTION</span><button aria-label="Close filters" onClick={closeDrawer}><Icon name="close" /></button></div><div className="shop-drawer-content">{filters()}</div><div className="shop-drawer-footer"><button onClick={closeDrawer}>Show {filtered.length} products <Icon name="arrow" size={19} /></button></div></dialog>
  </section>;
}

function ShopProductCard({ item, eager }: { item: (typeof products)[number]; eager: boolean }) {
  const [size, setSize] = useState("");
  const [backReady, setBackReady] = useState(false);
  const { addItems } = useCart();
  const sizes = item.footwear ? ["40", "41", "42", "43", "44", "45", "46"] : ["XS", "S", "M", "L", "XL"];
  return <article className={`shop-product-card ${item.back && backReady ? "has-back-view" : ""}`} aria-label={`${item.name}, ${item.color}`}>
    <Link href={`/products/${item.slug}`}>
      <div className={`shop-product-art ${item.footwear ? "is-footwear" : ""}`}><span className="shop-product-tag">{item.footwear ? "ON THE MOVE" : "ESSENTIAL"}</span><div className="shop-product-turn"><Image className="shop-image-front" src={item.image} alt={`${item.name}, ${item.color}`} width={600} height={700} sizes="(max-width: 600px) 46vw, (max-width: 1000px) 40vw, 25vw" loading={eager ? "eager" : "lazy"} />{item.back && <Image className="shop-image-back" src={item.back} alt="" aria-hidden="true" width={600} height={700} sizes="(max-width: 600px) 46vw, (max-width: 1000px) 40vw, 25vw" loading={eager ? "eager" : "lazy"} onLoad={() => setBackReady(true)} onError={() => setBackReady(false)} />}</div><span className="shop-card-arrow"><Icon name="arrow" size={20} /></span></div>
      <div className="shop-card-category">{item.brand} · {item.category}</div><div className="shop-card-title"><h2>{item.name}</h2><strong>{formatMoney(item.price)}</strong></div><p className="shop-card-color">{item.color}</p>
    </Link>
    <form className="shop-card-purchase" onSubmit={(event) => {
      event.preventDefault();
      if (!sizes.includes(size)) return;
      addItems([{ id: `shop-${item.id}-${size}`, name: `${item.name} · ${item.color}`, price: item.price, image: item.image, size }]);
    }}>
      <select aria-label={`Size for ${item.name}, ${item.color}`} required value={size} onChange={(event) => setSize(event.target.value)}><option value="" disabled>{item.footwear ? "EU size" : "Size"}</option>{sizes.map((value) => <option value={value} key={value}>{value}</option>)}</select>
      <button type="submit" aria-label={`Add ${item.name}, ${item.color} to cart`}><Icon name="bag" size={16} /><span>Add to cart</span></button>
    </form>
  </article>;
}



