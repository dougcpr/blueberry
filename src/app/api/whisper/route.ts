import {NextResponse} from "next/server"

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

export async function POST(req: Request) {
  let formData = await req.body

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: formData,
    // @ts-ignore
    duplex: "half"
  });

  const json: OpenAIModel = await response.json();
  return NextResponse.json(json);
}
