import Link from "next/link";
import { BrandMark, Icon } from "@/components/ui/icon";

export function SiteFooter() {
  return (
    <footer id="footer" className="site-footer">
      <div className="footer-top">
        <div className="footer-brand"><Link href="/" aria-label="Nike home"><BrandMark /></Link><p>Made to move.<br />Designed to last.</p><Link href="/shop" className="text-link">Find your next everyday favorite <Icon name="arrow" size={18} /></Link></div>
        <div><h2>Explore</h2><Link href="/shop">New & Featured</Link><Link href="/#collection">The Collection</Link><Link href="/#try-the-look">Shop the Look</Link><Link href="/#runway">Our Stories</Link></div>
        <div><h2>Help</h2><Link href="/account">Order Status</Link><Link href="/account">Delivery & Returns</Link><Link href="/account">Size Guide</Link><Link href="/account">Contact Us</Link></div>
        <div><h2>Join the movement</h2><p>A little inspiration. A lot of possibility.<br />Discover what comes next.</p><Link href="/account" className="footer-join">Become a Member <Icon name="arrow" size={18} /></Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Nike. All rights reserved.</span><div><span>Guides</span><span>Terms of Use</span><span>Privacy Policy</span></div><span className="footer-region"><Icon name="globe" size={17} /> United States · English</span></div>
    </footer>
  );
}
