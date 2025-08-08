export const navigationConfig = {
  main: [
    {
      title: 'Accueil',
      href: '/',
    },
    {
      title: 'Fonctionnalités',
      href: '/features',
    },
    {
      title: 'Tarifs',
      href: '/pricing',
    },
    {
      title: 'Support',
      href: '/support',
    },
  ],
  dashboard: [
    {
      title: 'Vue d\'ensemble',
      href: '/dashboard',
      icon: 'Home',
    },
    {
      title: 'Mes Pages',
      href: '/dashboard/pages',
      icon: 'Link',
    },
    {
      title: 'QR Codes',
      href: '/dashboard/qr-codes',
      icon: 'QrCode',
    },
    {
      title: 'Liens Courts',
      href: '/dashboard/short-links',
      icon: 'ExternalLink',
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: 'BarChart',
    },
    {
      title: 'Paramètres',
      href: '/dashboard/settings',
      icon: 'Settings',
    },
  ],
  footer: [
    {
      title: 'Produit',
      items: [
        {
          title: 'Fonctionnalités',
          href: '/features',
        },
        {
          title: 'Tarifs',
          href: '/pricing',
        },
        {
          title: 'API',
          href: '/api',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Centre d\'aide',
          href: '/help',
        },
        {
          title: 'Contact',
          href: '/contact',
        },
        {
          title: 'Status',
          href: '/status',
        },
      ],
    },
    {
      title: 'Entreprise',
      items: [
        {
          title: 'À propos',
          href: '/about',
        },
        {
          title: 'Blog',
          href: '/blog',
        },
        {
          title: 'Carrières',
          href: '/careers',
        },
      ],
    },
    {
      title: 'Légal',
      items: [
        {
          title: 'Mentions légales',
          href: '/legal',
        },
        {
          title: 'Confidentialité',
          href: '/privacy',
        },
        {
          title: 'CGU',
          href: '/terms',
        },
      ],
    },
  ],
} as const;
