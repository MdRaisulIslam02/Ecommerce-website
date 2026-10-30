"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { useCart } from "@/features/cart/cart-provider";
import { orbitShoes, orbitSizes } from "./shoe-catalog";

// A closed curve: front, upper-right, far-right, rear, bottom, lower-left.
const anchors = [
  [63, 42, 1, 0, 1], [76, 23, .63, 12, 1], [88, 26, .39, 20, 1],
  [104, 38, .27, 30, .85], [69, 121, .20, -30, .2],
  [47, 101, .34, -25, .9], [51, 63, .62, -15, 1],
];
const modulo = (value: number, count = 7) => (value % count + count) % count;
function orbitPosition(slot: number) {
  const wrapped = modulo(slot), base = Math.floor(wrapped), t = wrapped - base;
  return anchors[0].map((_, axis) => {
    const p0 = anchors[modulo(base - 1)][axis], p1 = anchors[base][axis];
    const p2 = anchors[modulo(base + 1)][axis], p3 = anchors[modulo(base + 2)][axis];
    return .5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
  });
}
function shoeStyle(index: number, phase: number): CSSProperties {
  const [x, y, scale, angle, opacity] = orbitPosition(index - phase);
  return { left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${Math.max(.15, scale)})`, opacity: Math.max(0, Math.min(1, opacity)), zIndex: Math.round(scale * 100) };
}

export function ShoeOrbit() {
  const [active, setActive] = useState(5);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [reading, setReading] = useState(false);
  const [size, setSize] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef<{ id: number; x: number; y: number; phase: number; step: number; moved: boolean } | null>(null);
  const suppressClickUntil = useRef(0);
  const root = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const ridges = useRef<HTMLSpanElement>(null);
  const phase = useRef(5);
  const target = useRef(5);
  const { addItems } = useCart();
  const shoe = orbitShoes[active];

  function rotateTo(index: number, manual = true) {
    const next = modulo(index);
    const current = modulo(target.current);
    const difference = modulo(next - current + 3) - 3;
    target.current += difference;
    setActive(next);
    setSize(null);
    if (manual) setPlaying(false);
  }
  function paint(value: number) {
    buttons.current.forEach((button, index) => {
      if (!button) return;
      const style = shoeStyle(index, value);
      button.style.left = String(style.left);
      button.style.top = String(style.top);
      button.style.transform = String(style.transform);
      button.style.opacity = String(style.opacity);
      button.style.zIndex = String(style.zIndex);
    });
    if (ridges.current) ridges.current.style.backgroundPositionX = `${value * 55}px`;
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClickUntil.current = 0;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY,
      phase: phase.current, step: Math.max(110, Math.min(260, event.currentTarget.clientWidth * .18)), moved: false };
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (!start.moved) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      start.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
      setPlaying(false);
      setSize(null);
    }
    event.preventDefault();
    phase.current = start.phase - dx / start.step;
    target.current = phase.current;
    paint(phase.current);
    setActive(modulo(Math.round(phase.current)));
  }
  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    gesture.current = null;
    if (!start.moved) return;
    suppressClickUntil.current = performance.now() + 400;
    target.current = Math.round(phase.current);
    setActive(modulo(target.current));
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (dragging) return;
    if (reduced) { phase.current = target.current; paint(phase.current); return; }
    if (!visible) return;
    let frame = 0, previous = 0;
    const animate = (now: number) => {
      if (gesture.current?.moved) return;
      const dt = previous ? Math.min((now - previous) / 1000, .05) : 1 / 60;
      previous = now;
      const gap = target.current - phase.current;
      phase.current = Math.abs(gap) < .0005 ? target.current : phase.current + gap * (1 - Math.exp(-5 * dt));
      paint(phase.current);
      if (phase.current !== target.current) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, visible, reduced, dragging]);
  useEffect(() => {
    if (!playing || !visible || reading || reduced) return;
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      target.current += 1;
      setActive(modulo(target.current));
      setSize(null);
    }, 4400);
    return () => clearInterval(timer);
  }, [playing, visible, reading, reduced]);

  return <section ref={root} id="shoe-orbit" className="shoe-orbit-section" aria-label="Rotating footwear collection" aria-roledescription="carousel">
    <div className="orbit-meta" onMouseEnter={() => setReading(true)} onMouseLeave={() => setReading(false)}
      onFocusCapture={() => setReading(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setReading(false); }}>
      <p className="orbit-counter">{String(active + 1).padStart(2, "0")} / 07</p>
      <div aria-live={playing ? "off" : "polite"} aria-atomic="true"><h2 id="orbit-product-title">{shoe.name}</h2><p className="orbit-product-price">${shoe.price.toFixed(2)}</p></div>
      <Link className="orbit-detail-link" href={`/products/${shoe.slug}`}>View details <Icon name="arrow" size={23} /></Link>
    </div>
    <div className={`orbit-shoes ${dragging ? "is-dragging" : ""}`} aria-label="Choose a shoe — drag to rotate"
      onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={finishDrag}
      onPointerCancel={finishDrag} onLostPointerCapture={finishDrag}
      onDragStart={(event) => event.preventDefault()}
      onClickCapture={(event) => { if (performance.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation(); suppressClickUntil.current = 0; } }}>
      <span className="orbit-guide orbit-guide-one" /><span className="orbit-guide orbit-guide-two" />
      {orbitShoes.map((item, index) => <button ref={(node) => { buttons.current[index] = node; }} key={item.id}
        className="orbit-shoe" style={shoeStyle(index, 5)}
        aria-label={`Show ${item.name}, ${item.color}`} aria-pressed={active === index}
        tabIndex={active === index ? 0 : -1} onClick={() => rotateTo(index)}>
        <Image src={item.image} width={1200} height={1200} alt={item.name} sizes="(max-width: 600px) 88vw, 40vw" loading="eager" draggable={false} />
      </button>)}
    </div>
    <div className="orbit-wheel-wrap">
      <div className="orbit-wheel"><span ref={ridges} className="orbit-wheel-ridges" /><span className="orbit-wheel-gloss" /><span className="orbit-wheel-notch" />
        <input type="range" min={0} max={6} step={1} value={active} aria-label="Drag the wheel" aria-valuetext={`${shoe.name}, ${shoe.color}, ${active + 1} of 7`}
          onPointerDown={() => setPlaying(false)} onChange={(event) => rotateTo(Number(event.currentTarget.value))}
          onKeyDown={(event) => {
            if (["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "Home", "End"].includes(event.key)) {
              event.preventDefault();
              rotateTo(event.key === "Home" ? 0 : event.key === "End" ? 6 : active + (["ArrowLeft", "ArrowDown"].includes(event.key) ? -1 : 1));
            }
          }} />
      </div>
      <div className="orbit-wheel-caption"><span>01</span><span>Drag the wheel</span><span>07</span></div>
      <button className="orbit-autoplay" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause shoe rotation" : "Play shoe rotation"} aria-pressed={playing}>{playing ? <span className="pause-symbol" /> : <span className="play-symbol" />}<span>{playing ? "Auto rotation" : "Resume rotation"}</span></button>
    </div>
    <div className="orbit-purchase">
      <div className="orbit-sizes" aria-label="Choose EU shoe size">{orbitSizes.map((item) => <button key={item} aria-label={`EU ${item}`} aria-pressed={size === item} className={size === item ? "selected" : ""} onClick={() => { setSize(item); setPlaying(false); }}>{item}</button>)}</div>
      {size !== null && <button className="orbit-add" onClick={() => addItems([{ id: `${shoe.id}-${size}`, name: shoe.name, price: shoe.price, image: shoe.image, size: String(size) }])}>Add size {size} to bag <Icon name="arrow" size={21} /></button>}
    </div>
  </section>;
}
