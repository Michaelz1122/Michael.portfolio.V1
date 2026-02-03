import { test } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

import { POST } from "./route";

const createRequest = (body: Record<string, unknown>) =>
  new NextRequest("http://localhost/api/send-email", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

test("POST /api/send-email returns 400 when required fields are missing", async () => {
  const request = createRequest({ name: "", email: "", message: "" });
  const response = await POST(request);

  assert.equal(response.status, 400);
  const payload = await response.json();
  assert.equal(payload.error, "Name, email, and message are required");
});

test("POST /api/send-email returns 500 when Gmail env vars are missing", async () => {
  const previousEmail = process.env.GMAIL_EMAIL;
  const previousPassword = process.env.GMAIL_APP_PASSWORD;
  delete process.env.GMAIL_EMAIL;
  delete process.env.GMAIL_APP_PASSWORD;

  const request = createRequest({
    name: "Test User",
    email: "test@example.com",
    message: "Hello!",
  });
  const response = await POST(request);

  if (previousEmail) {
    process.env.GMAIL_EMAIL = previousEmail;
  }
  if (previousPassword) {
    process.env.GMAIL_APP_PASSWORD = previousPassword;
  }

  assert.equal(response.status, 500);
  const payload = await response.json();
  assert.equal(payload.error, "Email service not configured");
});
