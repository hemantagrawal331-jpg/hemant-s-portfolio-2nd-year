import { NextResponse } from "next/server";
import { portfolioData } from "@/data/portfolioData";
import { asText, formSubmitPayload, isFormSubmitDelivered, parseContactInput, validateContactInput } from "@/lib/contactForm";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const vercel = request.headers.get("x-vercel-forwarded-for");
  const real = request.headers.get("x-real-ip");
  const forwarded = request.headers.get("x-forwarded-for");
  return vercel?.split(",")[0]?.trim() || real?.split(",")[0]?.trim() || forwarded?.split(",")[0]?.trim() || "";
}

function isLimited(ip: string) {
  if (!ip) return false;
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

function siteOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      return "";
    }
  }
  return "";
}

function inbox() {
  return process.env.CONTACT_TO_EMAIL || portfolioData.social.personalEmail;
}

async function sendWithResend(input: { name: string; email: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `Portfolio inquiry from ${input.name}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    }),
  });

  return response.ok;
}

async function sendWithFormSubmit(
  request: Request,
  input: { name: string; email: string; message: string },
) {
  const to = inbox();
  const origin = siteOrigin(request);
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (origin) {
    headers.Origin = origin;
    headers.Referer = `${origin}/`;
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers,
    body: JSON.stringify(formSubmitPayload(input)),
  });

  const result = await response.json().catch(() => null);
  return isFormSubmitDelivered(result);
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 403 });
  }

  if (isLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
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

  const sent = (await sendWithResend(parsed)) || (await sendWithFormSubmit(request, parsed));
  if (!sent) {
    return NextResponse.json(
      { ok: false, error: "Could not send the message. Try again, or email Hemant directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
