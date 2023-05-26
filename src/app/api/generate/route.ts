import {NextResponse} from "next/server";

type OpenAIModel = {
  data: OpenAIModelMetaData[];
  object: string;
}

type OpenAIModelMetaData = {
  id: string;
  object: string;
  owned_by: string;
  permission: any;
}

type OpenAIPayload = {
  model: string;
  prompt: string;
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
}

export async function POST(req: Request) {

  const { prompt } = await req.json();

  const payload: OpenAIPayload = {
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  };

  const response = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload)
  });

  const json: OpenAIModel = await response.json();
  return NextResponse.json(json);
}