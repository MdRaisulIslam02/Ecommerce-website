"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

// Demo content until real customer reviews are connected.
const reviews = [
  { name: "Alex M.", initials: "AM", rating: 5, title: "The layer I keep reaching for.", text: "Soft, substantial and just the right oversized fit. It works with pretty much everything in my wardrobe.", product: "Hoodie", detail: "Heather Gray · Size M" },
  { name: "Jamie R.", initials: "JR", rating: 5, title: "Looks good. Feels even better.", text: "The weight of the fabric makes all the difference. A simple everyday piece that feels a little more considered.", product: "Sweatshirt Plus", detail: "Forest Green · Size L" },
  { name: "Sam K.", initials: "SK", rating: 4, title: "An easy everyday favourite.", text: "Comfortable from the first wear. The relaxed shape is great—I'd size down if you prefer something more fitted.", product: "Tshirt", detail: "Black · Size M" },
  { name: "Taylor D.", initials: "TD", rating: 5, title: "A little sharper, still relaxed.", text: "Easy to dress up without feeling too formal. I love the clean shape and the way it sits over a tee.", product: "Tailored Blazer", detail: "Midnight Navy · Size L" },
  { name: "Morgan L.", initials: "ML", rating: 5, title: "Made for days on repeat.", text: "The neutral colour goes with everything. Plenty of room to move, and the cuffs keep the shape looking tidy.", product: "Sweatshirt", detail: "Sail · Size S" },
  { name: "Casey W.", initials: "CW", rating: 5, title: "My new off-duty essential.", text: "A great roomy fit with a substantial feel. The back detail is a nice touch without being too much.", product: "Hoodie Black", detail: "Washed Black · Size M" },
];

function Stars({ rating }: { rating: number }) {
  return <span className="review-stars" role="img" aria-label={`${rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <span key={star} className={star <= rating ? "filled" : ""} aria-hidden="true">★</span>)}</span>;
}

export function CustomerReviews() {
  const track = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ first: 1, last: 3, atStart: true, atEnd: false });
  const average = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  function updatePosition() {
    const list = track.current, card = list?.firstElementChild as HTMLElement | null;
    if (!list || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(list).columnGap || "0");
    const first = Math.round(list.scrollLeft / step) + 1;
    const visible = Math.max(1, Math.round((list.clientWidth + 20) / step));
    setPosition({ first, last: Math.min(reviews.length, first + visible - 1), atStart: list.scrollLeft <= 2, atEnd: list.scrollLeft + list.clientWidth >= list.scrollWidth - 2 });
  }
  useEffect(() => {
    const observer = new ResizeObserver(updatePosition);
    if (track.current) observer.observe(track.current);
    updatePosition();
    return () => observer.disconnect();
  }, []);
  function move(direction: number) {
    const list = track.current, card = list?.firstElementChild as HTMLElement | null;
    if (!list || !card) return;
    list.scrollBy({ left: direction * (card.offsetWidth + parseFloat(getComputedStyle(list).columnGap || "0")), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <section className="customer-reviews" id="customer-reviews" aria-labelledby="customer-reviews-title">
    <div className="reviews-heading"><div><p className="reviews-eyebrow">THE COMMUNITY · SAMPLE REVIEWS</p><h2 id="customer-reviews-title">Worn. Loved.<br /><span>Repeated.</span></h2><p className="reviews-intro">Everyday pieces. A few words from the people who wear them.</p></div><div className="reviews-summary"><span className="reviews-average">{average}<small>/ 5</small></span><Stars rating={5} /><p>Based on {reviews.length} sample reviews</p></div></div>
    <ul ref={track} className="reviews-track" aria-label="Customer review cards" onScroll={updatePosition} tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>
      {reviews.map((review, index) => <li className="review-card" key={review.name} aria-label={`Review ${index + 1} of ${reviews.length}`}><div className="review-card-top"><Stars rating={review.rating} /><span className="review-quote" aria-hidden="true">“</span></div><h3>{review.title}</h3><p className="review-text">{review.text}</p><div className="review-author"><span className="review-avatar" aria-hidden="true">{review.initials}</span><div><strong>{review.name}</strong><span>Sample customer review</span></div></div><div className="review-product"><span>{review.product}</span><small>{review.detail}</small></div></li>)}
    </ul>
    <div className="reviews-bottom"><span className="reviews-count" aria-live="polite">{String(position.first).padStart(2, "0")}–{String(position.last).padStart(2, "0")} <span>/ {String(reviews.length).padStart(2, "0")}</span></span><div className="reviews-progress" aria-hidden="true"><span style={{ width: `${(position.last - position.first + 1) / reviews.length * 100}%`, left: `${(position.first - 1) / reviews.length * 100}%` }} /></div><div className="reviews-arrows"><button aria-label="Previous reviews" disabled={position.atStart} onClick={() => move(-1)}><Icon name="arrow" size={23} style={{ transform: "rotate(180deg)" }} /></button><button aria-label="Next reviews" disabled={position.atEnd} onClick={() => move(1)}><Icon name="arrow" size={23} /></button></div></div>
  </section>;
}
