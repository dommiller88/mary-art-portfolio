import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(1, "Message is required").max(4000),
  // Honeypot field: real visitors never fill this in.
  company: z.string().max(0).optional().default(""),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid submission" },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO_EMAIL;

  if (resendApiKey && contactTo) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "portfolio@resend.dev",
        to: contactTo,
        reply_to: email,
        subject: `New inquiry from ${name}`,
        text: message,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend request failed:", await res.text());
      return NextResponse.json({ message: "Failed to send message" }, { status: 502 });
    }
  } else {
    // No email provider configured yet — log so local/dev submissions are visible.
    console.info("[contact] New inquiry (email provider not configured):", {
      name,
      email,
      message,
    });
  }

  return NextResponse.json({ message: "Message sent" }, { status: 200 });
}
