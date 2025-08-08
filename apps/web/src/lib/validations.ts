import { z } from 'zod';

// Page validation schemas
export const pageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  slug: z.string().min(1, 'Slug is required').max(50, 'Slug must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  theme: z.enum(['default', 'minimal', 'dark', 'colorful', 'professional']).default('default'),
  background: z.string().url('Invalid background URL').optional().or(z.literal('')),
  is_active: z.boolean().default(true),
});

export const linkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  url: z.string().url('Invalid URL').min(1, 'URL is required'),
  icon: z.string().optional(),
  is_active: z.boolean().default(true),
  order: z.number().min(0).default(0),
});

export const pageWithLinksSchema = pageSchema.extend({
  links: z.array(linkSchema).min(1, 'At least one link is required').max(20, 'Maximum 20 links allowed'),
});

// QR Code validation schemas
export const qrCodeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  content: z.string().min(1, 'Content is required').max(2000, 'Content must be less than 2000 characters'),
  type: z.enum(['url', 'text', 'email', 'phone', 'wifi']),
  size: z.number().min(128).max(1024).default(256),
  foreground_color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#000000'),
  background_color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#FFFFFF'),
  include_logo: z.boolean().default(false),
  logo_url: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  error_correction: z.enum(['L', 'M', 'Q', 'H']).default('M'),
  margin: z.number().min(0).max(8).default(4),
  is_active: z.boolean().default(true),
});

// Short Link validation schemas
export const shortLinkSchema = z.object({
  original_url: z.string().url('Invalid URL').min(1, 'Original URL is required'),
  custom_slug: z.string().max(50, 'Custom slug must be less than 50 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Custom slug can only contain letters, numbers, hyphens, and underscores')
    .optional(),
  title: z.string().max(100, 'Title must be less than 100 characters').optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  tags: z.array(z.string().max(50)).max(10, 'Maximum 10 tags allowed').default([]),
  expires_at: z.date().optional(),
  is_password_protected: z.boolean().default(false),
  password: z.string().min(4, 'Password must be at least 4 characters').optional(),
  track_analytics: z.boolean().default(true),
  is_active: z.boolean().default(true),
}).refine((data) => {
  if (data.is_password_protected && !data.password) {
    return false;
  }
  return true;
}, {
  message: 'Password is required when password protection is enabled',
  path: ['password'],
});

// User profile validation schemas
export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  avatar_url: z.string().url('Invalid avatar URL').optional().or(z.literal('')),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  social_links: z.object({
    twitter: z.string().url('Invalid Twitter URL').optional().or(z.literal('')),
    instagram: z.string().url('Invalid Instagram URL').optional().or(z.literal('')),
    linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
    youtube: z.string().url('Invalid YouTube URL').optional().or(z.literal('')),
    tiktok: z.string().url('Invalid TikTok URL').optional().or(z.literal('')),
  }).optional(),
});

// Settings validation schemas
export const notificationSettingsSchema = z.object({
  email_notifications: z.boolean().default(true),
  page_views: z.boolean().default(true),
  link_clicks: z.boolean().default(true),
  qr_scans: z.boolean().default(true),
  weekly_reports: z.boolean().default(false),
  marketing_emails: z.boolean().default(false),
});

export const privacySettingsSchema = z.object({
  profile_visibility: z.enum(['public', 'private', 'password']).default('public'),
  profile_password: z.string().min(4, 'Password must be at least 4 characters').optional(),
  analytics_tracking: z.boolean().default(true),
  data_sharing: z.boolean().default(false),
});

// Search validation schemas
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Search query too long'),
  type: z.enum(['all', 'pages', 'links', 'qr_codes', 'short_links']).default('all'),
  sort_by: z.enum(['relevance', 'date', 'name', 'views', 'clicks']).default('relevance'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
});

// Export validation schemas
export const exportSchema = z.object({
  type: z.enum(['analytics', 'profiles', 'links', 'qr_codes', 'short_links', 'all']),
  format: z.enum(['json', 'csv']),
  date_range: z.enum(['7d', '30d', '90d', '1y', 'all']).default('30d'),
});

// Analytics filter schemas
export const analyticsFilterSchema = z.object({
  time_range: z.enum(['7d', '30d', '90d', '1y']).default('30d'),
  profile_id: z.string().uuid().optional(),
  event_type: z.enum(['profile_view', 'link_click', 'qr_scan', 'short_link_click']).optional(),
  device_type: z.enum(['mobile', 'tablet', 'desktop']).optional(),
  country: z.string().optional(),
});

// Billing validation schemas
export const billingActionSchema = z.object({
  action: z.enum(['create_checkout_session', 'create_portal_session', 'cancel_subscription', 'reactivate_subscription']),
  price_id: z.string().optional(),
});

// Form schemas for specific components
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters'),
});

export const feedbackFormSchema = z.object({
  rating: z.number().min(1).max(5),
  category: z.enum(['bug', 'feature', 'improvement', 'other']),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  email: z.string().email('Invalid email address').optional(),
});

// Type exports
export type PageFormData = z.infer<typeof pageSchema>;
export type PageWithLinksFormData = z.infer<typeof pageWithLinksSchema>;
export type LinkFormData = z.infer<typeof linkSchema>;
export type QRCodeFormData = z.infer<typeof qrCodeSchema>;
export type ShortLinkFormData = z.infer<typeof shortLinkSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type NotificationSettingsFormData = z.infer<typeof notificationSettingsSchema>;
export type PrivacySettingsFormData = z.infer<typeof privacySettingsSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
export type ExportFormData = z.infer<typeof exportSchema>;
export type AnalyticsFilterFormData = z.infer<typeof analyticsFilterSchema>;
export type BillingActionFormData = z.infer<typeof billingActionSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
