import { NextResponse } from "next/server";
import { asText, parseContactInput, validateContactInput } from "@/lib/contactForm";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 403 });
  }

  if (isLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json({ ok: false, error: "Contact form is not configured." }, { status: 503 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;
  const parsed = parseContactInput({
    name: asText(body.name),
    email: asText(body.email),
    message: asText(body.message),
    website: asText(body.website),
  });

  if (parsed.website) {
    return NextResponse.json({ ok: true });
  }

  const invalid = validateContactInput(parsed);
  if (invalid) {
    return NextResponse.json({ ok: false, error: invalid }, { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: parsed.email,
      subject: `Portfolio inquiry from ${parsed.name}`,
      text: `Name: ${parsed.name}\nEmail: ${parsed.email}\n\n${parsed.message}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, error: "Could not send the message. Try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
