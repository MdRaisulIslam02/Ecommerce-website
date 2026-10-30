import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link href="/" className="mt-6 inline-block underline">Back to home</Link>
    </main>
  );
}
