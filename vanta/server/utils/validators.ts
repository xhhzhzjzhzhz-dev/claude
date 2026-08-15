import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const configurationSchema = z.object({
  vehicleId: z.string().uuid(),
  color: z.string().optional(),
  wheels: z.string().optional(),
  interior: z.string().optional(),
  trim: z.string().optional(),
  aeroPackage: z.string().optional(),
  name: z.string().optional(),
});

export const storySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  category: z.string().min(1, 'Category is required'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().optional(),
  author: z.string().optional(),
  readingTime: z.number().optional(),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1, 'Quote is required'),
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  publication: z.string().optional(),
});
