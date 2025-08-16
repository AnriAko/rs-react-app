export async function handleApiError(res: Response) {
  if (!res.ok) {
    let message = `API error: ${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      if (data?.message) {
        message = data.message;
      }
    } catch {}
    throw new Error(message);
  }
}
