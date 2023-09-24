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

export type Message = {
  role: Role;
  content: string;
  function_call?: FunctionCall
}

export enum Role {
  system = "system",
  user = "user",
  assistant = "assistant",
  function = "function"
}

export type FunctionCall = {
  name: string;
  arguments: string;
}

export type OpenAIPayload = {
  model: string;
  messages: Message[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
}