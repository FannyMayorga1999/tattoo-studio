import type { Artist, PortfolioItem, TattooStyle, ContactFormData, ContactMessage, Appointment, TimeSlot, AdminUser } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function fetchJSON<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `API error: ${res.statusText}`);
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

export async function login(username: string, password: string): Promise<{ token: string; admin: AdminUser }> {
  return fetchJSON<{ token: string; admin: AdminUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function updateArtist(id: number, data: Partial<Artist>): Promise<Artist> {
  return fetchJSON<Artist>(`/admin/artist/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function getAdminPortfolio(): Promise<PortfolioItem[]> {
  return fetchJSON<PortfolioItem[]>("/admin/portfolio");
}

export async function createPortfolioItem(data: Partial<PortfolioItem>): Promise<PortfolioItem> {
  return fetchJSON<PortfolioItem>("/admin/portfolio", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePortfolioItem(id: number, data: Partial<PortfolioItem>): Promise<PortfolioItem> {
  return fetchJSON<PortfolioItem>(`/admin/portfolio/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deletePortfolioItem(id: number): Promise<void> {
  return fetchJSON<void>(`/admin/portfolio/${id}`, { method: "DELETE" });
}

export async function getAdminStyles(): Promise<TattooStyle[]> {
  return fetchJSON<TattooStyle[]>("/admin/styles");
}

export async function createStyle(data: Partial<TattooStyle>): Promise<TattooStyle> {
  return fetchJSON<TattooStyle>("/admin/styles", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateStyle(id: number, data: Partial<TattooStyle>): Promise<TattooStyle> {
  return fetchJSON<TattooStyle>(`/admin/styles/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteStyle(id: number): Promise<void> {
  return fetchJSON<void>(`/admin/styles/${id}`, { method: "DELETE" });
}

export async function getMessages(): Promise<ContactMessage[]> {
  return fetchJSON<ContactMessage[]>("/admin/contact");
}

export async function markMessageRead(id: number, read: boolean): Promise<ContactMessage> {
  return fetchJSON<ContactMessage>(`/admin/contact/${id}`, {
    method: "PUT",
    body: JSON.stringify({ read }),
  });
}

export async function deleteMessage(id: number): Promise<void> {
  return fetchJSON<void>(`/admin/contact/${id}`, { method: "DELETE" });
}

export async function getAdminAppointments(): Promise<Appointment[]> {
  return fetchJSON<Appointment[]>("/admin/appointments");
}

export async function updateAppointmentStatus(id: number, status: string): Promise<Appointment> {
  return fetchJSON<Appointment>(`/admin/appointments/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export async function deleteAppointment(id: number): Promise<void> {
  return fetchJSON<void>(`/admin/appointments/${id}`, { method: "DELETE" });
}

export async function createAppointment(data: Partial<Appointment>): Promise<Appointment> {
  return fetchJSON<Appointment>("/appointments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAvailableSlots(date: string): Promise<TimeSlot[]> {
  return fetchJSON<TimeSlot[]>(`/appointments/available?date=${encodeURIComponent(date)}`);
}

export async function uploadImage(file: File): Promise<string> {
  const token = getToken();
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API_URL}/admin/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Upload failed");
  }
  const data = await res.json();
  return data.url;
}
