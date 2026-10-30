import { PagePlaceholder } from "@/components/shared/page-placeholder";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PagePlaceholder title="Product details" description={`Placeholder for product: ${slug}. Product images, pricing and purchase options will be added with the design and backend.`} />;
}
