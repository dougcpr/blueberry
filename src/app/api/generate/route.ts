import {NextResponse} from "next/server";
import {OpenAIModel, OpenAIPayload} from "@/app/api/models/openai";

export async function POST(req: Request) {

  const { messages } = await req.json();

  const payload: OpenAIPayload = {
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload)
  });

  const json: OpenAIModel = await response.json();
  console.log(json)
  return NextResponse.json(json);
}