export const siteConfig = {
  name: "Mary Miller",
  title: "Mary Miller — Artist Portfolio",
  description:
    "Paintings, drawings, and prints by Mary Miller. Explore the gallery, current exhibitions, and available works.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/commissions", label: "Commissions" },
  { href: "/about", label: "About" },
  { href: "/exhibitions", label: "Exhibitions" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const cvSectionLabels: Record<string, string> = {
  education: "Education",
  awards: "Awards & Honors",
  publications: "Publications",
  residencies: "Residencies",
  collections: "Collections",
  press: "Press",
};

export const cvSectionOrder = [
  "education",
  "residencies",
  "awards",
  "collections",
  "publications",
  "press",
];
