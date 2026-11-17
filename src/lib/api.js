const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiGet(endpoint) {
  const url = `${API_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
      },
    });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} - ${text}`);
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("API REQUEST ERROR:", error);
    throw error;
  }
}