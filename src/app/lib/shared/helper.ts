export async function completeResponse(prompt: string) {
  console.log(prompt)
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({prompt}),
  });

  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.json()
}