import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./storefront.css";
import "./hero.css";
import "./collection.css";

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
