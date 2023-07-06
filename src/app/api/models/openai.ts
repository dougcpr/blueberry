export type OpenAIModel = {
  data: OpenAIModelMetaData[];
  object: string;
}

export type OpenAIModelMetaData = {
  id: string;
  object: string;
  owned_by: string;
  permission: any;
}

export type OpenAIPayload = {
  model: string;
  prompt: string;
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
}