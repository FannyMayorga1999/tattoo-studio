import type { Artist, PortfolioItem, TattooStyle, ContactFormData } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function fetchJSON<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`);
  }
  return res.json();
}

export async function getArtist(): Promise<Artist> {
  return fetchJSON<Artist>("/artist");
}

export async function getPortfolio(category?: string): Promise<PortfolioItem[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchJSON<PortfolioItem[]>(`/portfolio${query}`);
}

export async function getPortfolioItem(id: number): Promise<PortfolioItem> {
  return fetchJSON<PortfolioItem>(`/portfolio/${id}`);
}

export async function getStyles(): Promise<TattooStyle[]> {
  return fetchJSON<TattooStyle[]>("/styles");
}

export async function submitContact(data: ContactFormData): Promise<{ id: number }> {
  return fetchJSON<{ id: number }>("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
