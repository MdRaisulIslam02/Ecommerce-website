"use client";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { formatMoney } from "@/lib/currency";
import { orbitSizes, type OrbitShoe } from "./shoe-catalog";

type PreviewReview = { name: string; title: string; text: string; rating: number };
export function ProductInformation({ shoe }: { shoe: OrbitShoe }) {
  const [tab, setTab] = useState<"details" | "reviews">("details");
  const [writing, setWriting] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<PreviewReview[]>([]);
  const [message, setMessage] = useState("");
  const detailsTab = useRef<HTMLButtonElement>(null);
  const reviewsTab = useRef<HTMLButtonElement>(null);
  const writeButton = useRef<HTMLButtonElement>(null);
  const prefix = `product-info-${shoe.id}`;
  const average = reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : "—";
  function selectTab(next: "details" | "reviews") { setTab(next); }
  return <section id="product-information" className="product-information" aria-label="Product information and reviews">
    <div className="product-info-tabs" role="tablist" aria-label="Product information" onKeyDown={(event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? "details" : event.key === "End" ? "reviews" : tab === "details" ? "reviews" : "details";
      setTab(next); (next === "details" ? detailsTab : reviewsTab).current?.focus();
    }}><button ref={detailsTab} role="tab" id={`${prefix}-details-tab`} aria-controls={`${prefix}-details-panel`} aria-selected={tab === "details"} tabIndex={tab === "details" ? 0 : -1} onClick={() => selectTab("details")}>Product details</button><button ref={reviewsTab} role="tab" id={`${prefix}-reviews-tab`} aria-controls={`${prefix}-reviews-panel`} aria-selected={tab === "reviews"} tabIndex={tab === "reviews" ? 0 : -1} onClick={() => selectTab("reviews")}>Reviews <span>{reviews.length}</span></button><p>THE LITTLE DETAILS. THE BIG PICTURE.</p></div>
    <div id={`${prefix}-details-panel`} role="tabpanel" aria-labelledby={`${prefix}-details-tab`} hidden={tab !== "details"} tabIndex={0}>
      <div className="product-info-details-layout"><div className="product-info-description"><p className="product-info-eyebrow">GET TO KNOW YOUR NEXT FAVOURITE</p><h2>A closer look at<br />{shoe.name}.</h2><p>Explore {shoe.name} in {shoe.color.toLowerCase()}. A footwear pick from our everyday collection, ready to style your way.</p><p>Take a look at the colour and available sizes below, then choose your preferred EU size before adding this pair to your bag.</p><div className="product-info-highlights"><span><Icon name="bag" size={17} />Footwear collection</span><span><Icon name="globe" size={17} />EU sizes {orbitSizes[0]}–{orbitSizes[orbitSizes.length - 1]}</span><span><Icon name="truck" size={18} />Delivery across Bangladesh</span></div><details className="product-care"><summary>Care & sizing<Icon name="plus" size={17} /></summary><p>Choose your usual EU shoe size and check the manufacturer’s size guidance before ordering. Follow the product’s care label. For everyday cleaning, use a soft cloth and allow the shoes to air dry.</p></details></div><aside className="product-specifications" aria-label="Product specifications"><p>AT A GLANCE</p><h3>The details.</h3><dl><div><dt>Product</dt><dd>{shoe.name}</dd></div><div><dt>Colour</dt><dd>{shoe.color}</dd></div><div><dt>Category</dt><dd>Footwear</dd></div><div><dt>Available sizes</dt><dd>{orbitSizes.join(" / ")}</dd></div><div><dt>Price</dt><dd>{formatMoney(shoe.price)}</dd></div></dl><div className="product-spec-note"><Icon name="shield" size={18} /><span>All prices are in Bangladeshi taka (BDT).</span></div></aside></div>
    </div>
    <div id={`${prefix}-reviews-panel`} role="tabpanel" aria-labelledby={`${prefix}-reviews-tab`} hidden={tab !== "reviews"} tabIndex={0}>
      <div className="product-review-heading"><div><p className="product-info-eyebrow">FROM THE PEOPLE WHO WEAR IT</p><h2>Customer reviews.</h2><p>A few words can help someone find their next favourite.</p></div><button ref={writeButton} className="product-write-review" onClick={() => { setWriting(!writing); setMessage(""); }}>{writing ? "Close form" : "Write a review"}<Icon name={writing ? "close" : "plus"} size={17} /></button></div>
      <div className="product-review-layout"><aside className="product-review-summary"><span className="product-review-average">{average}<small>/ 5</small></span><div className="product-review-summary-stars" aria-hidden="true">{[1,2,3,4,5].map((star) => <span key={star} className={reviews.length && star <= Math.round(Number(average)) ? "filled" : ""}>★</span>)}</div><p>{reviews.length ? `${reviews.length} preview ${reviews.length === 1 ? "review" : "reviews"}` : "No reviews to display yet"}</p>{[5,4,3,2,1].map((value) => <div className="product-rating-bar" key={value}><span>{value} <span aria-hidden="true">★</span></span><span><i style={{width:`${reviews.length ? reviews.filter((review) => review.rating === value).length / reviews.length * 100 : 0}%`}} /></span><small>{reviews.filter((review) => review.rating === value).length}</small></div>)}<span className="product-review-preview-note">Review submissions are previews until account services are connected.</span></aside>
      <div className="product-review-content">{writing && <form className="product-review-form" onSubmit={(event) => {
        event.preventDefault(); const form = event.currentTarget, data = new FormData(form);
        const review = { name:String(data.get("name") || "").trim(), title:String(data.get("title") || "").trim(), text:String(data.get("review") || "").trim(), rating };
        if (!review.name || !review.title || !review.text || rating < 1 || rating > 5) { setMessage("Please enter your name, rating and review."); return; }
        setReviews((current) => [review, ...current]); setWriting(false); setRating(0); setMessage("Your review is shown as a preview. It is not published or saved after leaving this page."); writeButton.current?.focus();
      }}><h3>How did it feel?</h3><fieldset className="product-rating-input"><legend>Your rating</legend>{[1,2,3,4,5].map((value) => <label key={value} className={value <= rating ? "is-filled" : ""}><input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} required aria-label={`${value} ${value === 1 ? "star" : "stars"}`} /><span aria-hidden="true">★</span></label>)}</fieldset><div className="product-review-form-row"><label>Your name<input autoFocus name="name" placeholder="Your name" required maxLength={80} autoComplete="name" /></label><label>Review title<input name="title" placeholder="A few words to sum it up" required maxLength={120} /></label></div><label>Your review<textarea name="review" placeholder="Share what you liked, the fit, or anything helpful." required rows={4} maxLength={2000} /></label><div className="product-review-form-bottom"><span>Preview only · your review stays on this page.</span><button type="submit">Preview review<Icon name="arrow" size={18} /></button></div></form>}
        {message && <p className="product-review-message" role="status">{message}</p>}
        {reviews.length ? <ul className="product-review-list">{reviews.map((review,index) => <li key={index}><div className="product-review-card-top"><span role="img" aria-label={`${review.rating} out of 5 stars`}>{[1,2,3,4,5].map((star) => <span key={star} aria-hidden="true" className={star <= review.rating ? "filled" : ""}>★</span>)}</span><small>Preview review</small></div><h3>{review.title}</h3><p>{review.text}</p><div className="product-review-author"><span aria-hidden="true">{review.name.charAt(0).toUpperCase()}</span><strong>{review.name}</strong></div></li>)}</ul> : !writing && <div className="product-review-empty"><span><Icon name="heart" size={30} /></span><h3>Your experience matters.</h3><p>Be the first to share your thoughts on {shoe.name}.</p><button onClick={() => setWriting(true)}>Write the first review<Icon name="arrow" size={17} /></button></div>}
      </div></div>
    </div>
  </section>;
}

