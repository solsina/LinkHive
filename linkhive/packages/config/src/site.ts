export const siteConfig = {
  name: 'LinkHive',
  description: 'Créez votre page link-in-bio personnalisée avec QR codes et analytics',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/linkhive',
    github: 'https://github.com/linkhive',
    discord: 'https://discord.gg/linkhive',
  },
  creator: 'LinkHive Team',
  keywords: [
    'link in bio',
    'bio link',
    'QR codes',
    'social media links',
    'linktree alternative',
    'personal branding',
    'analytics',
    'short links',
  ],
  authors: [
    {
      name: 'LinkHive Team',
      url: 'https://linkhive.com',
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
