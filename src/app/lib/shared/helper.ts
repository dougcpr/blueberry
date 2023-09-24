import {Message} from "@/app/api/models/openai";

export async function completeResponse(messages: Message[]) {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({messages}),
  });

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.json()
}