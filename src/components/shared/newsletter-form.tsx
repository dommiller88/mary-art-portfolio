"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  return (
    <form
      className="mt-4 flex max-w-sm gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        toast("Newsletter signup is coming soon.");
      }}
    >
      <Input type="email" placeholder="Email address" aria-label="Email address" required />
      <Button type="submit" variant="outline">
        Sign up
      </Button>
    </form>
  );
}
