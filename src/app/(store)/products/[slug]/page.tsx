import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { orbitShoes } from "@/features/products/shoe-catalog";
import { ShoeDetails } from "@/features/products/shoe-details";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const shoe = orbitShoes.find((item) => item.slug === slug);
  if (shoe) return <ShoeDetails shoe={shoe} />;
  return <PagePlaceholder title="Product details" description={`Placeholder for product: ${slug}. Product images, pricing and purchase options will be added with the design and backend.`} />;
}
