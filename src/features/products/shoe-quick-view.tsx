"use client";

import Image from "next/image";
import { formatMoney } from "@/lib/currency";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useCart } from "@/features/cart/cart-provider";
import { orbitShoes, orbitSizes } from "./shoe-catalog";

type ShoeQuickViewProps = { open: boolean; index: number; onClose: () => void; onChange: (index: number) => void };

export function ShoeQuickView({ open, index, onClose, onChange }: ShoeQuickViewProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const thumbnailButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const [size, setSize] = useState<number | null>(null);
  const { addItems, notice } = useCart();
  const shoe = orbitShoes[index];
  const change = (next: number) => onChange((next + orbitShoes.length) % orbitShoes.length);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    if (!open) { if (modal.open) modal.close(); return; }
    if (!modal.open) modal.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (modal.open) modal.close();
    };
  }, [open]);
  useEffect(() => {
    setSize(null);
    if (!open) return;
    const list = thumbnails.current, button = thumbnailButtons.current[index];
    if (list && button) list.scrollTo({
      left: button.offsetLeft - list.clientWidth / 2 + button.offsetWidth / 2,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [index, open]);

  return <dialog id="shoe-product-popup" ref={dialog} className="shoe-product-popup" aria-labelledby="shoe-popup-title"
    onClose={onClose} onKeyDown={(event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault(); change(index + (event.key === "ArrowRight" ? 1 : -1));
      }
    }}>
    <button className="shoe-popup-close" aria-label="Close product popup" onClick={() => dialog.current?.close()}><span>Close</span><Icon name="close" size={29} /></button>
    {notice && <p className="shoe-popup-notice" role="status">{notice}</p>}
    <div className="shoe-popup-body">
      <div className="shoe-popup-gallery">
        <div className="shoe-popup-viewer"><Image key={shoe.image} src={shoe.image} width={1200} height={1200} alt={`${shoe.name}, ${shoe.color}`} sizes="(max-width: 850px) 90vw, 52vw" loading="eager" draggable={false} /></div>
        <div className="shoe-popup-gallery-bottom">
          <div ref={thumbnails} className="shoe-popup-thumbnails" aria-label="Product gallery">
            {orbitShoes.map((item, itemIndex) => <button type="button" key={item.id} ref={(node) => { thumbnailButtons.current[itemIndex] = node; }}
              className={itemIndex === index ? "selected" : ""} aria-label={`View product ${itemIndex + 1}: ${item.name}, ${item.color}`} aria-pressed={itemIndex === index}
              onClick={() => change(itemIndex)}><Image src={item.image} width={120} height={120} alt="" sizes="100px" draggable={false} /></button>)}
          </div>
          <div className="shoe-popup-navigation"><button aria-label="Previous popup product" onClick={() => change(index - 1)}><Icon name="arrow" size={28} style={{ transform: "rotate(180deg)" }} /></button><span aria-live="polite">{String(index + 1).padStart(2, "0")} / 07</span><button aria-label="Next popup product" onClick={() => change(index + 1)}><Icon name="arrow" size={28} /></button></div>
        </div>
      </div>
      <div className="shoe-popup-details">
        <div aria-live="polite" aria-atomic="true"><h2 id="shoe-popup-title">{shoe.name}</h2><p className="shoe-popup-price">{formatMoney(shoe.price)}</p></div>
        <p className="shoe-popup-size-title">Shoe size</p>
        <div className="shoe-popup-sizes" aria-label="Popup EU shoe sizes">{orbitSizes.map((item) => <button aria-label={`EU ${item}`} aria-pressed={size === item} className={size === item ? "selected" : ""} key={item} onClick={() => setSize(item)}>{item}</button>)}</div>
        <button className="shoe-popup-add" disabled={size === null} onClick={() => { if (size !== null) addItems([{ id: `${shoe.id}-${size}`, name: shoe.name, price: shoe.price, image: shoe.image, size: String(size) }]); }}>{size === null ? "Select a size" : "Add to bag"}</button>
        <Link className="shoe-popup-full-details" href={`/products/${shoe.slug}`}>View full details <Icon name="arrow" size={23} /></Link>
      </div>
    </div>
  </dialog>;
}


