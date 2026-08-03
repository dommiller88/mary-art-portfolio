import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type?: string };

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Missing document type" }, { status: 400 });
    }

    revalidateTag(body._type);

    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() });
  } catch (error) {
    console.error("[revalidate] failed:", error);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
