"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { formatMoney } from "@/lib/currency";
import { useCart } from "./cart-provider";

type CartDrawerProps = { open: boolean; onClose: () => void };
export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const modal = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [closing, setClosing] = useState(false);
  const { items, count, update, remove } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  useEffect(() => {
    if (!open) return;
    setClosing(false);
    const dialog = modal.current;
    if (!dialog?.open) dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = null;
      document.body.style.overflow = previous;
      if (dialog?.open) dialog.close();
    };
  }, [open]);
  function close() {
    if (closeTimer.current) return;
    setClosing(true);
    closeTimer.current = setTimeout(onClose, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220);
  }
  return <dialog ref={modal} id="cart-drawer" className={`cart-drawer ${closing ? "is-closing" : ""}`} aria-labelledby="cart-drawer-title" onClose={onClose} onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close(); } }}>
    <header className="cart-drawer-header"><div><p>YOUR EVERYDAY ESSENTIALS</p><h2 id="cart-drawer-title">Your bag.<span aria-label={`${count} items`}>{String(count).padStart(2,"0")}</span></h2></div><button type="button" className="cart-drawer-close" aria-label="Close shopping bag" onClick={close}><Icon name="close" size={23} /></button></header>
    {items.length > 0 ? <>
      <div className="cart-drawer-delivery"><Icon name="truck" size={19} /><span>Nationwide delivery across Bangladesh</span><Icon name="shield" size={16} /></div>
      <div className="cart-drawer-items" aria-label="Products in your bag"><ul>{items.map((item) => <li className="cart-drawer-item" key={item.id}><div className="cart-drawer-image"><Image src={item.image} alt={item.name} width={180} height={210} sizes="100px" /></div><div className="cart-drawer-item-info"><div className="cart-drawer-item-title"><h3>{item.name}</h3><button type="button" aria-label={`Remove ${item.name} from bag`} onClick={() => remove(item.id)}><Icon name="close" size={16} /></button></div><p className="cart-drawer-size">{item.size ? `Size: ${item.size}` : "Everyday essential"}</p><p className="cart-drawer-unit-price">{formatMoney(item.price)}</p><div className="cart-drawer-item-bottom"><div className="cart-drawer-quantity" aria-label={`Quantity of ${item.name}`}><button type="button" aria-label={`Decrease quantity of ${item.name}`} disabled={item.quantity <= 1} onClick={() => update(item.id, item.quantity - 1)}><Icon name="minus" size={13} /></button><span aria-live="polite">{item.quantity}</span><button type="button" aria-label={`Increase quantity of ${item.name}`} disabled={item.quantity >= 99} onClick={() => update(item.id, item.quantity + 1)}><Icon name="plus" size={13} /></button></div><strong>{formatMoney(item.price * item.quantity)}</strong></div></div></li>)}</ul><div className="cart-drawer-edit-note"><Icon name="bag" size={16} /><span>A few good pieces. Ready for your everyday.</span></div></div>
      <footer className="cart-drawer-summary"><div className="cart-drawer-subtotal"><span>Subtotal <small>({count} {count === 1 ? "item" : "items"})</small></span><strong aria-live="polite">{formatMoney(subtotal)}</strong></div><p className="cart-drawer-summary-note">Delivery and any applicable charges are calculated at checkout.</p><Link href="/checkout" className="cart-drawer-checkout" onClick={onClose}>Continue to checkout<Icon name="arrow" size={21} /></Link><Link href="/cart" className="cart-drawer-full-cart" onClick={onClose}>View full cart<Icon name="arrow" size={18} /></Link><div className="cart-drawer-payment"><Icon name="shield" size={15} /><span>BDT · bKash · Nagad · Card · Cash on delivery</span></div><p className="cart-drawer-preview-note">Preview · orders and payments are not active yet.</p></footer>
    </> : <div className="cart-drawer-empty"><span className="cart-drawer-empty-icon"><Icon name="bag" size={43} /></span><p className="cart-drawer-empty-eyebrow">ROOM FOR SOMETHING GOOD</p><h3>Your next favourite<br />is waiting.</h3><p>Your bag is empty. Find a few pieces<br />you’ll wear on repeat.</p><Link href="/shop" className="cart-drawer-checkout" onClick={onClose}>Continue shopping<Icon name="arrow" size={20} /></Link><span className="cart-drawer-empty-bottom">GOOD PIECES. EVERYDAY POSSIBILITIES.</span></div>}
  </dialog>;
}
