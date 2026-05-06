// netlify/functions/chat.js

import OpenAI from "openai";
import { portfolioData } from "../../src/data/portfolioData.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt: aggressive constraints + ranking behavior
const SYSTEM_PROMPT = `
You are Atharva Mavale's portfolio assistant.

Rules:
- Answer only from the provided portfolio data.
- Do not invent facts, links, dates, projects, skills, or achievements.
- If information is missing, say you do not have that detail.
- Keep answers very concise and scannable.

Formatting rules:
- For summaries, always use separate bullet points on separate lines.
- Never combine multiple bullets into one paragraph.
- Put a line break after every bullet.
- Keep each bullet to one short sentence.
- For "summarise in 3 bullets", return exactly 3 bullets.
- Do not add intro text unless needed.

Project formatting:
- For projects, use:
  • Project Name — short description
    GitHub: <link if available>
    Live: <link if available>

Experience formatting:
- For experience summaries, use:
  • short bullet
  • short bullet
  • short bullet

If the question is unrelated to Atharva or his portfolio, say you only answer portfolio-related questions.
`;

const MAX_INPUT_LENGTH = 700;

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}

export default async (req) => {
  try {
    if (req.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    const body = await req.json().catch(() => null);

    if (!body || typeof body.message !== "string") {
      return jsonResponse({ error: "Invalid request body" }, 400);
    }

    const message = body.message.trim();

    if (!message) {
      return jsonResponse({ error: "Message is required" }, 400);
    }

    if (message.length > MAX_INPUT_LENGTH) {
      return jsonResponse(
        { error: `Message too long. Max ${MAX_INPUT_LENGTH} characters.` },
        400
      );
    }

    // Optional: pass a bit of recent history for follow-ups
    const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

    const safeHistory = history
      .filter(
        (item) =>
          item &&
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string"
      )
      .map((item) => ({
        role: item.role,
        content: item.content.slice(0, 1000)
      }));

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "system",
          content: `Portfolio data:\n${JSON.stringify(portfolioData, null, 2)}`
        },
        ...safeHistory,
        { role: "user", content: message }
      ]
    });

    const reply =
      response.output_text?.trim() ||
      "Sorry, I could not generate a response.";

    return jsonResponse({ reply }, 200);
  } catch (error) {
    console.error("Chat function error:", error);

    return jsonResponse({ error: "Internal server error" }, 500);
  }
};