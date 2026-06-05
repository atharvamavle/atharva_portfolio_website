// netlify/functions/chat.js

import OpenAI from "openai";
import { portfolioData } from "../../src/data/portfolioData.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt
const SYSTEM_PROMPT = `
You are Atharva Mavale's personal portfolio assistant. You answer ONLY questions about Atharva Mavale.

STRICT SCOPE RULE — ENFORCE WITHOUT EXCEPTION:
- If the question is not specifically about Atharva Mavale (his work, skills, personality, experience, projects, education, goals, or character), refuse immediately.
- Do NOT answer general AI questions, coding help, trivia, news, other people, or any off-topic request.
- Refusal response: "I only answer questions about Atharva Mavale. Ask me about his projects, skills, experience, or personality."
- Do not apologise, do not elaborate, do not offer alternatives.

What you CAN answer:
- Projects, tech stack, live links, GitHub links
- Skills, experience, education, certifications
- Personality, character, working style, values, interests, fun facts, goals
- Resume, contact, LinkedIn, GitHub profile

Data source: use only the provided portfolio data. Do not invent facts, links, or dates.

Personality questions ("what is he like?", "describe his character", "what are his interests?"):
- Draw from personality.summary, traits, workingStyle, values, interests, funFacts.
- Write warmly and naturally — 1-2 sentence intro, then 2-3 bullet traits, then 1 fun fact.

Formatting:
- Bullets on separate lines with line break after each.
- One short sentence per bullet.
- No intro text unless needed.
- Projects: "• Name — description\\nGitHub: url\\nLive: url"
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
          content: `Portfolio data:\n${JSON.stringify(portfolioData, nu