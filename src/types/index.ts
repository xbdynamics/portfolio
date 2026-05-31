// src/types/index.ts
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Project extends BaseEntity {
  title: string;
  description: string;
  fullDescription?: string;
  category: string;
  images: string[];
  thumbnail: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  status: 'draft' | 'published';
}

export interface Service extends BaseEntity {
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: {
    amount: number;
    currency: string;
    period: string;
  };
  active: boolean;
  order: number;
}

export interface TeamMember extends BaseEntity {
  name: string;
  position: string;
  bio: string;
  avatar: string;
  skills: string[];
  socialLinks: SocialLinks;
  active: boolean;
  order: number;
}

export interface Partner extends BaseEntity {
  name: string;
  logo: string;
  website: string;
  description?: string;
  active: boolean;
  order: number;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  seo: SEO;
  contactEmail: string;
  phone?: string;
  address?: string;
  socialLinks: SocialLinks;
  googleAnalyticsId?: string;
  maintenanceMode: boolean;
}

export interface UploadResponse {
  url: string;
  key: string;
  size: number;
  type: string;
}