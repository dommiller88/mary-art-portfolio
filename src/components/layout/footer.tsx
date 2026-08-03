import { Mail } from "lucide-react";
import Link from "next/link";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { navLinks, siteConfig } from "@/lib/constants";
import { getBiography } from "@/sanity/lib/fetchers";

export async function Footer() {
  const biography = await getBiography();
  const email = biography?.email;
  const instagram = biography?.instagram;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        <div className="max-w-sm">
          <p className="text-label text-base">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
          <p className="font-hand text-ink mt-4 -rotate-1 text-xl">see you at the opening</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <p className="text-label text-muted-foreground">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label text-muted-foreground">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              {instagram && (
                <li>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <InstagramIcon className="size-4" />
                    Instagram
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="size-4" />
                    Email
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="text-label mx-auto max-w-7xl px-6 py-6 text-muted-foreground lg:px-10">
          © {new Date().getFullYear()} {siteConfig.name} — all rights reserved
        </p>
      </div>
    </footer>
  );
}
