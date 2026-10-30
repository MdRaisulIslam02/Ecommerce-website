import Link from "next/link";
import { Icon } from "@/components/ui/icon";
type PagePlaceholderProps = { title: string; description: string };
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return <section className="standard-page placeholder-page"><p className="eyebrow">Nike · The everyday collection</p><h1>{title}</h1><p className="muted">{description}</p><Link href="/shop" className="button button-dark">Explore the Collection <Icon name="arrow" size={18} /></Link></section>;
}
