# Nike-inspired ecommerce frontend

Next.js App Router + TypeScript + Tailwind CSS, with a responsive homepage based on the supplied screenshot.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires Node.js 20.9 or newer.

## Verify

```bash
npm run build
npm run typecheck
```

## Structure

- `src/app/(store)`: homepage, shop, product, bag, checkout, wishlist and account routes.
- `src/features/products/storefront.tsx`: homepage sections and interactions.
- `src/features/products/catalog.ts`: sample products, looks and footwear.
- `src/features/cart`: browser-local bag provider and bag page.
- `src/components/layout`: shared navigation and footer.
- `src/components/ui`: reusable icon system.
- `src/app/storefront.css`: responsive storefront styling.
- `src/app/globals.css`: Tailwind entry.
- `src/lib/api/client.ts`: future Laravel JSON API client.
- `src/types/product.ts`: draft product/cart types.
- `public/images`: local imagery.

## Current behavior

The homepage includes garment quick views, size choices, complete-look add to bag, footwear selection, campaign controls, editorial scrolling and mobile navigation. Search filters the sample shop catalog. The bag supports quantities/removal and persists in localStorage.

Product detail, checkout, account and wishlist routes are placeholders. Real orders, payments, login and backend stock validation have not been implemented.

## Laravel later

Copy .env.example to .env.local and configure NEXT_PUBLIC_API_URL (example: http://localhost:8000/api). Never put secrets in NEXT_PUBLIC_ variables.

Use apiFetch<ResponseType>() for public JSON endpoints once the Laravel API contract is finalized. No API requests are made by the current sample storefront. Configure CORS and the chosen authentication/CSRF flow when connecting Laravel.

See DESIGN-NOTES.md for asset sources, generated-image prompts and implementation limits.
