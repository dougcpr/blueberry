import {NextResponse} from "next/server"
const { Configuration, OpenAIApi } = require("openai");
import { NextApiRequest } from 'next';
import * as fs from "fs";
const path = require('path');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
  let formData: any= await req.body
  const data = new FormData();
  // TODO: data is not being formatted correctly
  data.append("file", formData);
  data.append("model", "whisper-1");
  data.append("language", "en");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    headers: {
      ContentType: 'multipart/form-data',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: data,
    //@ts-ignore
    duplex: 'half'
  });

  const json: OpenAIModel = await response.json();
  return NextResponse.json(json);
}
