import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl italic">404</p>
      <h1 className="mt-4 text-xl">This page can&apos;t be found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you&apos;re looking for may have been moved or no longer exists.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return home</Link>
      </Button>
    </div>
  );
}
