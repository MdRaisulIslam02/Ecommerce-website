import { ShopCollection } from "@/features/products/shop-collection";
export const metadata = { title: "Shop the collection" };
export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <ShopCollection key={q || "all"} initialSearch={q || ""} />;
}
