export const REGISTER_URL = "https://stateless-model-214728805641.us-central1.run.app/register";
export const FRAME_URL = "https://stateless-model-214728805641.us-central1.run.app/frame";
// export const FRAME_URL = "https://1.us-central1.run.app/frame";

export async function registerClient(): Promise<string> {
  const response = await fetch(REGISTER_URL);
  const data = await response.json();
  return data.client_id;
}



export async function sendFrameToBackend(clientId: string, frame: string, timestamp: number, hiddenState: any, cellState: any) {
  const response = await fetch(FRAME_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      frame,
      timestamp,
      hidden_state: hiddenState,
      cell_state: cellState,
    }),
  });

  return response.json();
}
