export interface Artist {
  id: number;
  name: string;
  bio: string;
  avatar: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  socialLinks: SocialLinks | null;
  experience: number | null;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  pinterest?: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

export interface TattooStyle {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  icon: string | null;
  order: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  tattooStyle?: string;
  preferredDate?: string;
  message: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  tattooStyle: string | null;
  preferredDate: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Appointment {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  date: string;
  startTime: string;
  endTime: string;
  tattooStyle: string | null;
  description: string | null;
  status: string;
  createdAt: string;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface AdminUser {
  id: number;
  username: string;
  name: string;
}
