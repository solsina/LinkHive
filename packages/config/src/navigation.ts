import { 
  LayoutDashboard, 
  FileText, 
  QrCode, 
  BarChart3, 
  Settings, 
  Link as LinkIcon,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Copy,
  ExternalLink
} from 'lucide-react';

export const navigationConfig = {
  main: [
    {
      title: 'Features',
      href: '/#features',
    },
    {
      title: 'Pricing',
      href: '/#pricing',
    },
    {
      title: 'Analytics',
      href: '/#analytics',
    },
    {
      title: 'FAQ',
      href: '/#faq',
    },
  ],
  dashboard: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'LayoutDashboard',
    },
    {
      title: 'Pages',
      href: '/dashboard/pages',
      icon: 'FileText',
    },
    {
      title: 'QR Codes',
      href: '/dashboard/qr-codes',
      icon: 'QrCode',
    },
    {
      title: 'Short Links',
      href: '/dashboard/short-links',
      icon: 'Link',
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: 'BarChart3',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'Settings',
    },
  ],
  footer: [
    {
      title: 'Product',
      items: [
        {
          title: 'Features',
          href: '/#features',
        },
        {
          title: 'Pricing',
          href: '/#pricing',
        },
        {
          title: 'Analytics',
          href: '/#analytics',
        },
        {
          title: 'API',
          href: '/api',
        },
      ],
    },
    {
      title: 'Company',
      items: [
        {
          title: 'About',
          href: '/about',
        },
        {
          title: 'Blog',
          href: '/blog',
        },
        {
          title: 'Careers',
          href: '/careers',
        },
        {
          title: 'Contact',
          href: '/contact',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help Center',
          href: '/help',
        },
        {
          title: 'Documentation',
          href: '/docs',
        },
        {
          title: 'Status',
          href: '/status',
        },
        {
          title: 'Contact Support',
          href: '/support',
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          title: 'Privacy Policy',
          href: '/privacy',
        },
        {
          title: 'Terms of Service',
          href: '/terms',
        },
        {
          title: 'Cookie Policy',
          href: '/cookies',
        },
        {
          title: 'GDPR',
          href: '/gdpr',
        },
      ],
    },
  ],
  social: [
    {
      title: 'Twitter',
      href: 'https://twitter.com/linkhive',
      icon: 'Twitter',
    },
    {
      title: 'GitHub',
      href: 'https://github.com/linkhive',
      icon: 'Github',
    },
    {
      title: 'LinkedIn',
      href: 'https://linkedin.com/company/linkhive',
      icon: 'Linkedin',
    },
    {
      title: 'Discord',
      href: 'https://discord.gg/linkhive',
      icon: 'MessageCircle',
    },
  ],
} as const;

export const actionIcons = {
  view: Eye,
  edit: Edit,
  delete: Trash2,
  download: Download,
  copy: Copy,
  external: ExternalLink,
};
