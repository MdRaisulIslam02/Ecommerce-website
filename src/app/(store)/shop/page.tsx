import Link from "next/link";
import Image from "next/image";
import { garments, shoes } from "@/features/products/catalog";
export const metadata = { title: "The collection" };
export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const products = [...garments.slice(0, 6).map((item, index) => ({ name: item.name, color: item.color, price: 199, index, slug: "club-fleece-hoodie" })), ...shoes.map((shoe) => ({ ...shoe, color: "Everyday performance", index: -1 }))];
  const filtered = products.filter((item) => !q || `${item.name} ${item.color}`.toLowerCase().includes(q.toLowerCase()));
  return <section className="standard-page"><p className="eyebrow">New collection · Premium streetwear</p><h1>{q ? `Results for “${q}”` : "Everyday icons."}</h1><p className="muted">Considered essentials. Made to go wherever you do.</p><div className="shop-grid">{filtered.map((item, i) => <Link href={`/products/${item.slug}`} key={i} className="shop-card">{item.index >= 0 ? <div className="shop-card-image crop-product" style={{ backgroundPosition: `${item.index * 10}% center` }} /> : <div className="shop-card-image"><Image src={shoes.find((shoe) => shoe.slug === item.slug)!.image} width={500} height={500} alt={item.name} /></div>}<div><h2>{item.name}</h2><span>${item.price.toFixed(2)}</span></div><p>{item.color}</p></Link>)}</div>{filtered.length === 0 && <p className="empty-search">No matching products. <Link href="/shop">View the full collection</Link></p>}</section>;
}
