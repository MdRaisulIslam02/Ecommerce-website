"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BrandMark, Icon } from "@/components/ui/icon";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [reset, setReset] = useState(false);
  const [message, setMessage] = useState("");
  return <section className="login-page">
    <div className="login-story"><Image src="/images/editorial-one.jpg" alt="Everyday streetwear, styled for movement" fill sizes="(max-width: 850px) 100vw, 50vw" priority /><div className="login-story-shade" /><span className="login-story-label">MORE THAN WHAT YOU WEAR.</span><div className="login-story-copy"><span>YOUR EVERYDAY STARTS HERE</span><h2>Made for you.<br />Made for more.</h2><p>Your favourites. Your next find.<br />A little space for everything you love.</p></div><span className="login-story-bottom">NEW SEASON. NO LIMITS. <Icon name="arrow" size={20} /></span></div>
    <div className="login-form-side"><Link className="login-back" href="/shop"><Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} />Back to the collection</Link><div className="login-form-wrap"><BrandMark /><p className="account-eyebrow">YOUR PERSONAL SPACE</p><h1>{reset ? "Let’s get you back in." : "Good to see you."}</h1><p className="login-description">{reset ? "Enter your email to request a password reset." : "Sign in to keep your everyday essentials close."}</p>
      <form onSubmit={(event) => { event.preventDefault(); setMessage(reset ? "Password reset emails will be available when account services are connected." : "Sign-in is not available yet. Account services are being connected; no credentials have been sent or saved."); }}>
        <label className="account-field">Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
        {!reset && <><label className="account-field">Password<span className="login-password"><input aria-label="Password" type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" placeholder="Enter your password" required /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></span></label><div className="login-forgot"><button type="button" onClick={() => { setReset(true); setMessage(""); }}>Forgot password?</button></div></>}
        {message && <p role="status" className="account-form-notice">{message}</p>}
        <button className="account-primary login-submit" type="submit">{reset ? "Request reset link" : "Sign in"}<Icon name="arrow" size={20} /></button>
      </form>
      {reset ? <button className="login-text-button" onClick={() => { setReset(false); setMessage(""); }}>Back to sign in</button> : <div className="login-preview-link"><span>Take a look around.</span><Link href="/account">Explore your account <Icon name="arrow" size={16} /></Link></div>}
      <div className="login-note"><Icon name="shield" size={18} /><p>Account preview. Secure sign-in and password recovery will be available soon.</p></div>
    </div><p className="login-form-bottom">GOOD STYLE. YOUR WAY.</p></div>
  </section>;
}

