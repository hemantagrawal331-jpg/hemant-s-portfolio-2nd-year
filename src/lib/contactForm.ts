export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export function asText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function parseContactInput(input: ContactPayload) {
  return {
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    website: (input.website ?? "").trim(),
  };
}

export function validateContactInput(input: ContactPayload) {
  const data = parseContactInput(input);

  if (data.name.length < 2) return "Enter your name.";
  if (data.name.length > 80) return "Name is too long.";
  if (!EMAIL_PATTERN.test(data.email) || data.email.length > 120) return "Enter a valid email.";
  if (data.message.length < 10) return "Message should be at least 10 characters.";
  if (data.message.length > 2000) return "Message is too long.";

  return null;
}

export function isFormSubmitDelivered(payload: unknown) {
  if (!payload || typeof payload !== "object") return false;
  const result = payload as { success?: unknown; message?: unknown };
  const ok = result.success === true || result.success === "true";
  const message = typeof result.message === "string" ? result.message : "";
  return ok && !/activat/i.test(message);
}

export function formSubmitPayload(input: ContactPayload) {
  const data = parseContactInput(input);
  return {
    name: data.name,
    email: data.email,
    message: data.message,
    _replyto: data.email,
    _subject: `Portfolio inquiry from ${data.name}`,
    _captcha: "false",
    _template: "box",
  };
}
