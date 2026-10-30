"use client";
import Image from "next/image";
import { formatMoney } from "@/lib/currency";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { useCart } from "./cart-provider";

export function CartPage() {
  const { items, remove, update } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <section className="standard-page"><p className="eyebrow">Your everyday essentials</p><h1>In your bag.</h1>{items.length ? <div className="cart-layout"><div>{items.map((item) => <article className="cart-item" key={item.id}><Image src={item.image} width={180} height={180} alt={item.name} /><div><h2>{item.name}</h2>{item.size && <p>Size: {item.size}</p>}<p>{formatMoney(item.price)}</p><div className="quantity-control"><button aria-label={`Decrease quantity of ${item.name}`} disabled={item.quantity <= 1} onClick={() => update(item.id, item.quantity - 1)}><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button aria-label={`Increase quantity of ${item.name}`} disabled={item.quantity >= 99} onClick={() => update(item.id, item.quantity + 1)}><Icon name="plus" size={14} /></button><button className="remove-button" onClick={() => remove(item.id)}>Remove</button></div></div><strong>{formatMoney(item.price * item.quantity)}</strong></article>)}</div><aside className="cart-summary"><h2>Summary</h2><div><span>Subtotal</span><strong>{formatMoney(subtotal)}</strong></div><p>Delivery and taxes will be calculated when checkout is connected.</p><Link href="/checkout" className="button button-dark full-width">Continue to checkout <Icon name="arrow" size={19} /></Link><small>Frontend preview · orders and payments are not active.</small></aside></div> : <div className="empty-bag"><Icon name="bag" size={48} /><h2>A little room for something new.</h2><p>Your bag is empty. Explore the collection and find your next favorite.</p><Link href="/#collection" className="button button-dark">Explore the Collection <Icon name="arrow" size={18} /></Link></div>}</section>;
}

