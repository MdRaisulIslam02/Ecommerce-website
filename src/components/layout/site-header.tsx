"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark, Icon } from "@/components/ui/icon";
import { useCart } from "@/features/cart/cart-provider";
import { CartDrawer } from "@/features/cart/cart-drawer";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="site-header">
      <div className="utility-bar"><Link href="/shop">Find a Store</Link><span /> <Link href="/#footer">Help</Link><span /><Link href="/account">Join Us</Link><span /><Link href="/login">Sign In</Link></div>
      <div className="main-nav">
        <Link href="/" className="brand" aria-label="Nike home"><BrandMark /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/">Home</Link><Link href="/#collection">Nike Orbit</Link><Link href="/#try-the-look">Hand Rail Pro</Link><Link href="/#runway">Runway</Link>
        </nav>
        <div className="nav-actions">
          <button aria-label="Search" className="search-toggle" onClick={() => setSearchOpen(!searchOpen)} aria-expanded={searchOpen} aria-controls="site-search"><Icon name="search" size={20} /><span>Search</span></button>
          <Link href="/account" className="icon-button account-link" aria-label="My account"><Icon name="user" size={21} /></Link>
          <button type="button" className="icon-button bag-link" aria-label={`Shopping bag, ${count} items`} aria-haspopup="dialog" aria-expanded={cartOpen} aria-controls="cart-drawer" onClick={() => { setCartOpen(true); setMenuOpen(false); setSearchOpen(false); }}><Icon name="bag" size={21} />{count > 0 && <span className="bag-count">{count}</span>}</button>
          <button className="icon-button menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
        </div>
      </div>
      {searchOpen && <form id="site-search" action="/shop" className="search-panel"><label htmlFor="search-input">What are you looking for?</label><div><input autoFocus id="search-input" name="q" placeholder="Search clothing, shoes and more" required /><button type="submit" className="button button-dark">Search <Icon name="arrow" size={18} /></button></div></form>}
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[["Home", "/"], ["Nike Orbit", "/#collection"], ["Hand Rail Pro", "/#try-the-look"], ["Runway", "/#runway"], ["My account", "/account"]].map(([label, href]) => <Link key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<Icon name="arrow" size={19} /></Link>)}</nav>}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}


