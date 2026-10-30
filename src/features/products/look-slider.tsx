"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { useCart } from "@/features/cart/cart-provider";
import { runwayLooks, type LookProduct } from "./look-catalog";

const money = (value: number) => `$${value.toFixed(2)}`;
export function LookSlider() {
  const [active, setActive] = useState(2);
  const [detailView, setDetailView] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [pointRequest, setPointRequest] = useState(0);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const section = useRef<HTMLElement>(null);
  const productList = useRef<HTMLDivElement>(null);
  const productRows = useRef<(HTMLDivElement | null)[]>([]);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const { addItems } = useCart();
  const look = runwayLooks[active];
  const subtotal = look.products.reduce((sum, product) => sum + product.price, 0);
  const bundleTotal = Math.round(subtotal * .9 * 100) / 100;

  function select(index: number, manual = true) {
    setActive((index + runwayLooks.length) % runwayLooks.length);
    setExpanded(null);
    setSelectedPiece(null);
    setDetailView(false);
    if (manual) setPlaying(false);
    productList.current?.scrollTo({ top: 0, behavior: "instant" });
  }
  function chooseSize(product: LookProduct) { return sizes[product.id] || (product.sizes.includes("M") ? "M" : "42"); }
  function openDetails() {
    setPlaying(false);
    setExpanded(null);
    setSelectedPiece(null);
    setDetailView(true);
  }
  function closeDetails() {
    setDetailView(false);
    setSelectedPiece(null);
    setExpanded(null);
    requestAnimationFrame(() => section.current?.querySelector<HTMLButtonElement>(".runway-model.is-current .runway-model-hit")?.focus({ preventScroll: true }));
  }
  function selectPiece(index: number) {
    setSelectedPiece(index);
    setPointRequest((request) => request + 1);
    setExpanded(null);
    setPlaying(false);
  }
  function showProduct(index: number) {
    setSelectedPiece(index);
    setExpanded((current) => current === index ? null : index);
    setPlaying(false);
  }
  function addProduct(product: LookProduct) {
    const size = chooseSize(product);
    addItems([{ id: `${product.id}-${size}`, name: product.name, price: product.price, image: product.image, size }]);
  }
  function addBundle() {
    addItems(look.products.map((product) => {
      const size = chooseSize(product);
      return { id: `bundle-${active}-${product.id}-${size}`, name: product.name, image: product.image, size, price: Math.round(product.price * .9 * 100) / 100 };
    }));
  }
  function finishGesture(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || detailView) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      dragged.current = true;
      select(active + (dx < 0 ? 1 : -1));
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (section.current) observer.observe(section.current);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => { observer.disconnect(); media.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (!playing || detailView || hovering || !visible || reduced) return;
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setActive((index) => (index + 1) % runwayLooks.length);
      setExpanded(null);
      productList.current?.scrollTo({ top: 0, behavior: "instant" });
    }, 4800);
    return () => clearInterval(timer);
  }, [playing, detailView, hovering, visible, reduced]);
  useEffect(() => {
    if (expanded !== null) productRows.current[expanded]?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "nearest" });
  }, [expanded, reduced]);

  useEffect(() => {
    if (detailView) closeButton.current?.focus({ preventScroll: true });
  }, [detailView]);
  useEffect(() => {
    if (selectedPiece === null) return;
    const list = productList.current;
    const row = productRows.current[selectedPiece];
    if (list && row) {
      list.scrollTo({ top: row.offsetTop, behavior: reduced ? "instant" : "smooth" });
    }
  }, [selectedPiece, pointRequest, reduced]);

  return <section ref={section} id="try-the-look" className={`runway-slider ${detailView ? "is-detail" : ""}`} aria-labelledby="look-title" onKeyDown={(event) => { if (detailView && event.key === "Escape") { event.preventDefault(); closeDetails(); } }}>
    <div className="runway-gallery">
      {detailView ? <div className="runway-detail-heading"><div><p>Look {String(active + 1).padStart(2, "0")}</p><h2 id="look-title">{look.title}</h2></div><button ref={closeButton} className="runway-detail-close" aria-label="Close look detail" onClick={closeDetails}><Icon name="close" size={26} /></button></div> : <div className="runway-heading"><h2 id="look-title">Try the Look.</h2><p>Six looks, styled head to toe. Tap a pin to see the piece.</p></div>}
      <div className="runway-stage" role="region" aria-roledescription={detailView ? undefined : "carousel"} aria-label={detailView ? "Look details — choose a numbered product point" : "Styled looks — use arrow keys or swipe"} tabIndex={0}
        onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
        onKeyDown={(event) => {
          if (detailView) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); select(active + (event.key === "ArrowRight" ? 1 : -1)); }
          if (event.key === "Home") { event.preventDefault(); select(0); }
          if (event.key === "End") { event.preventDefault(); select(runwayLooks.length - 1); }
        }}
        onPointerDown={(event) => { if (detailView) return; gesture.current = { x: event.clientX, y: event.clientY }; dragged.current = false; }}
        onPointerUp={finishGesture} onPointerCancel={() => { gesture.current = null; }}>
        {runwayLooks.map((item, index) => {
          const delta = (index - active + 9) % 6 - 3;
          const distance = Math.abs(delta);
          const offset = Math.sign(delta) * [0, 30, 45.5, 65][distance];
          const style = { "--model-offset": `${offset}%`, "--model-scale": [1, .88, .76, .66][distance], "--model-blur": `${[0, 3.2, 6, 9][distance]}px`, opacity: distance < 3 ? 1 : 0, zIndex: 10 - distance } as CSSProperties;
          return <div className={`runway-model ${distance === 0 ? "is-current" : ""}`} style={style} key={item.image} aria-hidden={distance >= 3 || (detailView && distance !== 0)}>
            <span className="runway-model-shadow" />
            <Image className="runway-model-image" src={item.image} width={900} height={1600} alt="" sizes="(max-width: 600px) 220px, 22vw" draggable={false} loading="eager" />
            {!detailView && <button className="runway-model-hit" tabIndex={distance >= 3 ? -1 : 0} aria-label={distance === 0 ? `View ${item.title}: ${item.description}` : `Show look ${index + 1}: ${item.title}`}
              onClick={() => { if (dragged.current) { dragged.current = false; return; } if (distance === 0) openDetails(); else select(index); }}>
              {distance === 0 && <span className="runway-view-circle">View</span>}
            </button>}
            {distance === 0 && detailView && <div className="runway-pins">{look.products.map((product, i) => <button className={`runway-pin runway-pin-${i} ${selectedPiece === i ? "is-selected" : ""}`} key={product.id} aria-label={`View piece ${i + 1}: ${product.name}`} aria-pressed={selectedPiece === i} aria-controls={`runway-product-${i}`} onClick={() => selectPiece(i)}><span className="runway-pin-number">{i + 1}</span><span className="runway-pin-label">{product.name}</span></button>)}</div>}
          </div>;
        })}
      </div>
      {detailView && <p className="runway-detail-hint">Tap a dot to shop the piece</p>}
      <p className="sr-only" role="status" aria-live={playing ? "off" : "polite"}>Look {active + 1} of 6: {look.title}. {look.description}.{selectedPiece !== null && ` Selected product: ${look.products[selectedPiece].name}.`}</p>
      {!detailView && <div className="runway-controls">
        <button className="runway-arrow" onClick={() => select(active - 1)} aria-label="Previous look"><Icon name="arrow" size={37} style={{ transform: "rotate(180deg)" }} /></button>
        <div className="runway-tabs" aria-label="Choose a look">{runwayLooks.map((item, index) => <button key={item.image} aria-label={`Look ${index + 1}: ${item.title}`} aria-pressed={active === index} className={active === index ? "is-current" : ""} onClick={() => select(index)}><span>{String(index + 1).padStart(2, "0")}</span>{active === index && <b>{item.title}</b>}</button>)}</div>
        <button className="runway-play" aria-label={playing ? "Pause look slideshow" : "Play look slideshow"} aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? <span className="pause-symbol" /> : <span className="play-symbol" />}</button>
        <button className="runway-arrow" onClick={() => select(active + 1)} aria-label="Next look"><Icon name="arrow" size={37} /></button>
      </div>}
    </div>
    <aside className="runway-panel" aria-label="In this look">
      <div className="runway-panel-heading"><h3>In this look</h3><span>3 Pieces</span></div>
      <div className="runway-product-list" ref={productList} key={active}>
        {look.products.map((product, index) => <div id={`runway-product-${index}`} className={`runway-product ${expanded === index ? "is-expanded" : ""} ${selectedPiece === index ? "is-linked" : ""}`} key={product.id} ref={(node) => { productRows.current[index] = node; }}>
          <div className="runway-product-row"><button className="runway-product-image" onClick={() => showProduct(index)} aria-label={`Choose size for ${product.name}`}><Image src={product.image} width={180} height={220} alt={product.name} sizes="(max-width: 600px) 90px, 10vw" />{product.isNew && <span className="runway-new">New</span>}<span className="runway-piece-number">{index + 1}</span></button><div className="runway-product-info"><small>{product.brand}</small><h4>{product.name}</h4><p>{money(product.price)}</p></div><button className="runway-product-plus" aria-label={`Choose size and add ${product.name}`} aria-expanded={expanded === index} onClick={() => showProduct(index)}><Icon name={expanded === index ? "minus" : "plus"} size={25} /></button></div>
          {expanded === index && <div className="runway-size-panel"><p>Select {product.sizes.includes("M") ? "size" : "shoe size (EU)"}</p><div>{product.sizes.map((size) => <button key={size} aria-pressed={chooseSize(product) === size} className={chooseSize(product) === size ? "selected" : ""} onClick={() => setSizes((current) => ({ ...current, [product.id]: size }))}>{size}</button>)}</div><button className="button button-dark full-width" onClick={() => addProduct(product)}>Add to bag <Icon name="plus" size={17} /></button></div>}
        </div>)}
      </div>
      <div className="runway-bundle"><div className="runway-bundle-summary"><div><p>Complete the look</p><span>Bundle all 3 and save 10%</span></div><div className="runway-bundle-prices"><del>{money(subtotal)}</del><strong>{money(bundleTotal)}</strong></div></div><button className="runway-bundle-button" onClick={addBundle}>Add full look to bag <Icon name="arrow" size={34} /></button></div>
    </aside>
  </section>;
}
