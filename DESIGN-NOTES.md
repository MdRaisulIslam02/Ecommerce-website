# Frontend design implementation

Project: C:\ecommerce-desing

The supplied screenshot guided the navigation, muted gradient hero, hanging fleece collection, styled looks, rotating footwear showcase, manifesto, full-width campaign, editorial gallery and footer. The original source assets were not supplied; this implementation uses generated imagery and sample product/editorial photography, so it is not a pixel-for-pixel copy.

## Implemented
- Responsive homepage, shared header and footer.
- Garment quick-view dialog with size selection.
- Look selector and complete-look add to bag.
- Footwear selector, sizes and add to bag.
- Campaign controls and horizontally scrolling editorial gallery.
- Searchable sample product listing.
- Browser-local bag with quantity controls, removal and persistence.
- Keyboard labels, dialog focus management, reduced motion styles and skip link.

## Backend status
Laravel is not connected. Checkout, authentication, wishlist persistence and product detail pages remain placeholders. Product prices, stock and totals are sample frontend data. No orders or payments can be submitted.

## Validation
Production build, TypeScript check and browser checks of desktop/mobile layout, quick view, look changes, size selection, search and bag persistence.

## Assets
Built-in image_gen was used, not the CLI fallback.
Final saved generated assets:
- C:\ecommerce-desing\public\images\clothing-rail.png
- C:\ecommerce-desing\public\images\lumina-campaign.png
- C:\ecommerce-desing\public\images\streetwear-looks.png

### Final generation prompts

Clothing rail:
Use case: product-mockup. Asset type: transparent wide ecommerce clothing rail photograph for a premium streetwear homepage. Make one ultra-wide horizontal chrome garment rail with 11 evenly spaced hanging oversized hooded sweatshirts viewed slightly from the side. Each hoodie hangs naturally from a thin metal hanger on the horizontal rail. Garment color sequence black, navy, heather gray, ivory cream, forest green, charcoal, black, heather gray, ivory, forest green, navy. Garments all full length visible, detailed heavy cotton fleece fabric and natural folds, slightly varied orientation. Isolated on genuine transparent background, soft realistic studio shadows directly on fabric only. Wide panoramic composition, 3:1 image. Rail runs straight from left edge to right edge across upper 15% of image, hoodies occupy middle 80%, garments don't touch each other. No people, no text, no tags, no logos, no UI, no borders. Photorealistic luxury fashion catalog quality.

Lumina campaign:
Use case: ads-marketing. Photorealistic premium sport fashion editorial banner, panoramic 3:1. Tight cinematic head and shoulders portrait of a young athletic Black man facing front, wearing sleek translucent glowing orange wraparound sport sunglasses, black high neck athletic shirt. Dramatic low key lighting, face in deep shadow, light gray concrete studio background, motion streaks sweeping from his glasses across left half of the composition in black and burnt orange. Subject fills middle and right area. Left lower area uncluttered dark for overlaid white website copy later. Experimental high fashion sportswear campaign, realistic skin, high contrast, no text, no lettering, no logo, no watermark.

Streetwear looks:
Photorealistic ecommerce fashion editorial, wide landscape 3:2 photograph. Five diverse young adult male streetwear models standing on seamless pure white studio background floor, full body head to toe in frame. All evenly spaced in one row. Center male in olive green oversized crewneck sweatshirt, brown baggy trousers, white sneakers. Left two wear a charcoal sweatshirt with blue jeans and a white t-shirt with sage cargo trousers. Right two wear a black tee with blue jeans, and a rust brown sweatshirt with charcoal trousers. Natural relaxed standing poses, front view, sophisticated streetwear styling, realistic skin, bright soft studio lighting, subtle shadows under sneakers, no text, no logos. People occupy full height of frame with modest margins.

### Sample photography sources
- jordan.webp: https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp
- black-sneaker.webp: https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/1.webp
- editorial-one.jpg: https://images.unsplash.com/photo-1483985988355-763728e1935b
- editorial-two.jpg: https://images.unsplash.com/photo-1523398002811-999ca8dec234


## Hero hover refinement
- Independent products rotate from a narrow side angle to a full front view on mouse hover and keyboard focus.
- The active product name and $199.00 appear at the bottom left.
- A chrome SVG rail follows the full width of the hero, including both screen edges.
- The hero uses 15 individual positions with blazer, gray, black, cream and green variants.
- The remaining homepage sections retain their existing layout.

Generated asset (built-in image_gen): C:\ecommerce-desing\public\images\hero-garments-front.png
Final prompt:
Use case: product-mockup. Create a transparent ecommerce garment sprite sheet, very wide landscape 3:1 composition. Exactly FIVE individual front-facing realistic garments, evenly spaced across five equal-width columns, all vertically aligned at shoulders and hems, completely separated with transparent gaps, no overlap. Column 1: dark midnight navy double-breasted tailored blazer with lapels, six black buttons, long sleeves. Column 2: light heather gray oversized pullover hoodie, long sleeves. Column 3: washed black oversized short-sleeve T-shirt, with natural folds. Column 4: warm ivory cream oversized pullover hoodie, long sleeves. Column 5: dark forest green oversized pullover hoodie, long sleeves. Every garment is perfectly FRONT FACING, sleeves hang straight downward close to body, entire garment fully visible. Isolated floating garment product photography, no people, no mannequins, no skin, no hangers, no rail, no labels or text, no logos, no backdrop. Consistent natural luxury studio lighting, realistic detailed fabric, transparent background. Leave transparent margins around each garment so each fits strictly inside its own equal-width fifth of the image. Garments occupy middle 90% of canvas height.



## Current hero: original reference assets
The hero now uses the six products and actual side/front product photographs from https://nike-makknzjs.myshopify.com/ rather than the generated sprite. The generated sprite is retained as an unused earlier asset.
Local files: C:\ecommerce-desing\public\images\hero\
- blazer-side.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071515248388.webp?height=900
- blazer-front.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071514560224.webp?height=900
- gray-hoodie-side.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071514447647.webp?height=900
- gray-hoodie-front.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071514403809.webp?height=900
- black-hoodie-side.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071101516777.webp?height=900
- black-hoodie-front.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071101472773.webp?height=900
- cream-sweatshirt-side.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071517384792.webp?height=900
- cream-sweatshirt-front.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071517318112.webp?height=900
- green-sweatshirt-side.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071517049148.webp?height=900
- green-sweatshirt-front.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071516592552.webp?height=900
- black-tshirt-side.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071516549024.webp?height=900
- black-tshirt-front.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2610071515314737.webp?height=900

The full-width chrome rail and responsive placement are implemented in code. Hover/focus cross-fades each side image to the corresponding front image; product clicks open its matching quick view. Original website products and images were inspected directly in the browser.


Latest verification: TypeScript and browser hero checks passed. Production build verification is incomplete: Turbopack's Tailwind CSS worker exits before connecting during the build. The existing development server renders the revised hero correctly.


Collection refinement: replaced the static rail image with ten independent original side/front product pairs on a fixed chrome rail. The active piece expands and reveals its full front view; neighboring pieces receive small damped spring impulses. Continuous low-amplitude, differently phased wind motion pivots each garment from its hook. Animation pauses offscreen and respects reduced-motion preferences. Mobile uses scrolling inside the section without page overflow. TypeScript and browser checks passed. Implementation: src/features/products/collection-rail.tsx and src/app/collection.css.

Try the Look slider refinement: six original model cutouts, looping previous/next navigation, numbered look tabs, mouse/touch swipe, keyboard arrows/Home/End, play/pause, center View overlay and product pins. Adjacent models use smaller scale and blur. Product list and prices change with the active look; size selection and individual add-to-bag are supported. Full-look purchase applies the advertised 10% to all three browser-local bag lines. Verified total: $492.30. Test items were removed after validation. Mobile page width verified without overflow. Existing production-build worker limitation remains; TypeScript and browser checks passed.
Implementation: src/features/products/look-slider.tsx, src/features/products/look-catalog.ts, src/app/look-slider.css.
Original reference asset sources (saved under C:\ecommerce-desing\public\images\looks):
model-1.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/1.webp?v=1792848434&width=900
model-2.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/5.webp?v=1792848434&width=900
model-3.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/4.webp?v=1792848434&width=900
model-4.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/6.webp?v=1792848434&width=900
model-5.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/3.webp?v=1792848434&width=900
model-6.webp: https://nike-makknzjs.myshopify.com/cdn/shop/files/2.webp?v=1792848434&width=900
tatum.png: https://nike-makknzjs.myshopify.com/cdn/shop/files/1.png?width=600
jordan-12.png: https://nike-makknzjs.myshopify.com/cdn/shop/files/2.png?width=600
luka.png: https://nike-makknzjs.myshopify.com/cdn/shop/files/4.png?width=600

Look detail interaction refinement: carousel mode shows only VIEW on hover/focus. Clicking VIEW opens an inline enlarged look with a look number/title, close control and three numbered product points. Selecting a point highlights its matching product and scrolls only the product list to reveal it; it does not open size choices. Re-selecting a point reveals the same product again. The plus button controls size choices. Close/Escape restores the carousel and focus to the active model. Desktop, mobile, all three mappings, panel visibility, no mobile page overflow, and TypeScript checks passed.


Shoe orbit refinement: seven original reference shoe images on a closed interpolated orbit with perspective scaling, continuous curved transitions and automatic looping. The foreground shoe's counter, name, price and View details URL update together. A native keyboard-accessible range input drives the chrome drag wheel, including wrapping arrow keys. Manual selection and size choice pause rotation; play/pause is available. Rotation pauses offscreen, while reading the information panel, when the document is hidden and for reduced motion. Matching details pages and EU-size bag controls were added for the seven orbit entries. Verified auto advance, 7-to-1 wrap, actual wheel drag, matching details page, size-specific bag contents and mobile page width. Temporary test bag item was removed. TypeScript/browser validation passed; the previously documented production-build worker limitation remains.
Implementation: src/features/products/shoe-orbit.tsx, shoe-catalog.ts, shoe-details.tsx, src/app/shoe-orbit.css.
Source images saved in C:\ecommerce-desing\public\images\orbit:
shoe-1.png: https://nike-makknzjs.myshopify.com/cdn/shop/files/1_a7f51336-93eb-4078-b6c2-e14b721eaad0.png?v=1792493930&width=1200
shoe-2.png: https://nike-makknzjs.myshopify.com/cdn/shop/files/3_601e6b64-4e5b-4031-98cc-f63701e92f66.png?v=1792493930&width=1200
shoe-3.png: https://nike-makknzjs.myshopify.com/cdn/shop/files/2_a571db77-d4b0-4689-8bd8-434c8e97bc65.png?v=1792493930&width=1200
shoe-4.png: https://nike-makknzjs.myshopify.com/cdn/shop/files/8_63fc2d79-acc2-4d8d-98c0-416f1c055cff.png?v=1792493930&width=1200
shoe-5.png: https://nike-makknzjs.myshopify.com/cdn/shop/files/4_7cbe61bc-b2b9-4f84-a58f-b9704d1996da.png?v=1792493930&width=1200
shoe-6.png: https://nike-makknzjs.myshopify.com/cdn/shop/files/7_5273163c-5745-4e20-b9ad-09e0bbaa9ecd.png?v=1792493930&width=1200
shoe-7.png: https://nike-makknzjs.myshopify.com/cdn/shop/files/9_427d191d-5859-4a5e-9cfc-f4283fa83ea3.png?v=1792493930&width=1200


Direct shoe dragging: added horizontal pointer dragging over the product area with pointer capture, live orbit movement and nearest-product snapping on release. Dragging pauses automatic rotation, prevents accidental click selection, and keeps vertical touch scrolling available. Verified actual mouse drags left (06 to 07) and right (07 to 06), released drag state, continued wheel navigation and TypeScript check.

Shoe product popup: clicking an orbit shoe or View details opens a fullscreen native dialog matching the supplied reference. Includes large product image, scrolling thumbnail gallery, looping previous/next controls and keyboard arrows, synced name/price/details URL, EU 40–46 size selection, disabled add button until a size is selected, and an in-dialog bag confirmation. Close/Escape restores the underlying carousel; body scrolling is locked only while open. Pointer dragging retains rotation and suppresses accidental popup clicks. Verified desktop and 390px mobile layout, size reset on product change, gallery wrap, selected-size bag contents, Escape/Close, product click, drag from 05 to 06 without popup, and full-details navigation. Test bag item removed. TypeScript check passed. Existing production build worker limitation remains unchanged.
Implementation: src/features/products/shoe-quick-view.tsx, src/features/products/shoe-orbit.tsx, src/app/shoe-popup.css, src/app/layout.tsx.


Phone swipe fix: ignore bubbled lostpointercapture from child shoe buttons when touch capture transfers to the orbit surface. Previously this ended the drag as soon as the surface captured the touch pointer. Verified the actual component handlers through a simulated touch capture-transfer sequence, continued 200px movement, release and accidental-click suppression. TypeScript passed. Physical phone testing was not available in this session.

