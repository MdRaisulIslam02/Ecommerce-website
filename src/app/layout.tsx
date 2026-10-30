import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./storefront.css";
import "./hero.css";
import "./collection.css";
import "./look-slider.css";
import "./shoe-orbit.css";
import "./shoe-popup.css";
import "./shop.css";
import "./reviews.css";
import "./footer-benefits.css";
import "./account.css";
import "./cart-drawer.css";
import "./category-slider.css";

export const metadata: Metadata = {
  title: { default: "Nike", template: "%s | Nike" },
  description: "Ecommerce storefront",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}





