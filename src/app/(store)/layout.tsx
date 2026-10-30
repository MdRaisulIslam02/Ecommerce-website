import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartProvider } from "@/features/cart/cart-provider";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return <CartProvider><div className="store-shell"><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></div></CartProvider>;
}
