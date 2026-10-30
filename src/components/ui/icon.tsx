import type { CSSProperties } from "react";

type IconName = "search" | "user" | "bag" | "arrow" | "close" | "menu" | "plus" | "minus" | "heart" | "globe";
const paths: Record<IconName, string> = {
  search: "m21 21-4.5-4.5 M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z",
  user: "M20 21v-2a7 7 0 0 0-14 0v2 M17 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z",
  bag: "M5 7h14l1 14H4L5 7Z M8 8V6a4 4 0 0 1 8 0v2",
  arrow: "M3 12h18 m-6-6 6 6-6 6",
  close: "m6 6 12 12 M6 18 18 6",
  menu: "M3 6h18 M3 12h18 M3 18h18",
  plus: "M12 4v16 M4 12h16",
  minus: "M4 12h16",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z M3 12h18 M12 3c5 5 5 13 0 18-5-5-5-13 0-18",
};
export function Icon({ name, size = 22, style }: { name: IconName; size?: number; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}><path d={paths[name]} /></svg>;
}
export function BrandMark() {
  return <svg width="72" height="29" viewBox="0 0 72 29" fill="currentColor" aria-hidden="true"><path d="M3 14C0 21 3 28 12 25L70 2 15 16C9 18 7 15 9 8L3 14Z" /></svg>;
}
