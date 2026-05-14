import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6 text-center text-ink">
      <div className="max-w-sm">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-ink/45">
          404
        </p>
        <h1 className="mt-4 text-3xl font-light leading-tight">
          This page does not exist.
        </h1>
        <p className="mt-4 text-sm leading-6 text-ink/62">
          The facial analysis landing page is available from the home route.
        </p>
        <Link
          className="mt-7 inline-flex min-h-11 items-center rounded-[7px] bg-ink px-5 text-sm font-medium text-white transition hover:bg-ink/86 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          href="/"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
