import Link from "next/link";
import { BrandMark, Icon } from "@/components/ui/icon";

export function SiteFooter() {
  return (
    <>
    <section className="footer-benefits" aria-labelledby="footer-benefits-title">
      <div className="footer-benefits-heading"><div><p>THE DETAILS THAT MATTER</p><h2 id="footer-benefits-title">A little more peace of mind.</h2></div><span>Shop with confidence.</span></div>
      <ul className="footer-benefits-grid">
        {[
          { icon: "truck" as const, title: "Nationwide Delivery", description: "Fast tracked shipping across BD" },
          { icon: "shield" as const, title: "100% Authentic", description: "Verified vendors & genuine items" },
          { icon: "returns" as const, title: "7-Day Easy Returns", description: "Hassle-free exchange policy" },
          { icon: "card" as const, title: "Secure & COD", description: "bKash, Nagad, Card or Doorstep" },
        ].map((benefit) => <li key={benefit.title}><span className="footer-benefit-icon"><Icon name={benefit.icon} size={27} /></span><div><h2>{benefit.title}</h2><p>{benefit.description}</p></div></li>)}
      </ul>
    </section>
    <footer id="footer" className="site-footer">
      <div className="footer-top">
        <div className="footer-brand"><Link href="/" aria-label="Nike home"><BrandMark /></Link><p>Made to move.<br />Designed to last.</p><Link href="/shop" className="text-link">Find your next everyday favorite <Icon name="arrow" size={18} /></Link></div>
        <div><h2>Explore</h2><Link href="/shop">New & Featured</Link><Link href="/#collection">The Collection</Link><Link href="/#try-the-look">Shop the Look</Link><Link href="/#runway">Our Stories</Link></div>
        <div><h2>Help</h2><Link href="/account">Order Status</Link><Link href="/account">Delivery & Returns</Link><Link href="/account">Size Guide</Link><Link href="/account">Contact Us</Link></div>
        <div><h2>Join the movement</h2><p>A little inspiration. A lot of possibility.<br />Discover what comes next.</p><Link href="/account" className="footer-join">Become a Member <Icon name="arrow" size={18} /></Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Nike. All rights reserved.</span><div><span>Guides</span><span>Terms of Use</span><span>Privacy Policy</span></div><span className="footer-region"><Icon name="globe" size={17} /> Bangladesh · BDT</span></div>
    </footer>
    </>
  );
}


