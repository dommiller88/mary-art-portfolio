import { Mail } from "lucide-react";
import type { Metadata } from "next";

import { InstagramIcon } from "@/components/icons/instagram-icon";
import { ContactForm } from "@/components/shared/contact-form";
import { SectionHeading } from "@/components/shared/section-heading";
import { getBiography } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for inquiries, commissions, and press.",
};

export default async function ContactPage() {
  const biography = await getBiography();

  return (
    <div className="mx-auto max-w-5xl px-6 py-32 lg:px-10">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Get in touch"
            description="For inquiries about available work, commissions, or press, send a message below."
          />

          <div className="mt-10 space-y-3">
            {biography?.email && (
              <a
                href={`mailto:${biography.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
                {biography.email}
              </a>
            )}
            {biography?.instagram && (
              <a
                href={biography.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <InstagramIcon className="size-4" />
                Instagram
              </a>
            )}
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
