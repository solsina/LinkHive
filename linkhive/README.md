# LinkHive 🚀

Un clone complet de [taap.it](https://taap.it/fr) - Plateforme SaaS pour créer des pages "link-in-bio" personnalisables avec QR codes, statistiques, branding, et profils publics partageables.

## ✨ Fonctionnalités

- **Pages Link in Bio** - Créez des pages personnalisables pour vos réseaux sociaux
- **QR Codes** - Générez des QR codes personnalisables avec analytics
- **Liens Courts** - Créez des liens courts avec domaines personnalisés
- **Analytics Avancées** - Suivez vos performances en temps réel
- **Thèmes Personnalisés** - Personnalisez l'apparence de vos pages
- **Dashboard Moderne** - Interface intuitive pour gérer vos contenus
- **Authentification Sécurisée** - Avec Clerk
- **Paiements Stripe** - Plans Free, Pro et Enterprise
- **Base de Données Supabase** - Architecture scalable

## 🛠️ Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Animations**: Framer Motion
- **Authentification**: Clerk
- **Base de Données**: Supabase (PostgreSQL)
- **Paiements**: Stripe
- **Email**: Resend
- **Analytics**: Google Analytics, Microsoft Clarity
- **Déploiement**: Vercel
- **Monorepo**: Turbo

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd linkhive
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp env.example .env.local
   ```
   
   Remplissez les variables dans `.env.local` avec vos clés API.

4. **Lancer le développement**
   ```bash
   npm run dev
   ```

## 📁 Structure du Projet

```
linkhive/
├── apps/
│   └── web/                 # Application Next.js principale
│       ├── src/
│       │   ├── app/         # Pages et layouts
│       │   ├── components/  # Composants React
│       │   ├── hooks/       # Hooks personnalisés
│       │   ├── lib/         # Utilitaires
│       │   └── types/       # Types TypeScript
│       └── public/          # Assets statiques
├── packages/
│   ├── ui/                  # Composants UI partagés
│   ├── database/            # Client et types Supabase
│   └── config/              # Configuration partagée
└── docs/                    # Documentation
```

## 🔧 Configuration

### Variables d'Environnement Requises

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe Payments
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Email (Resend)
RESEND_API_KEY=

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_MICROSOFT_CLARITY_ID=
```

## 📊 Base de Données

Le schéma de base de données inclut :

- **users** - Informations utilisateurs
- **profiles** - Pages Link in Bio
- **links** - Liens des pages
- **qr_codes** - QR codes générés
- **analytics** - Données d'analytics
- **subscriptions** - Abonnements Stripe

## 🎨 Personnalisation

### Thèmes
Les thèmes sont configurables via Tailwind CSS avec des variables CSS personnalisées.

### Composants
Tous les composants UI sont dans `packages/ui` et peuvent être personnalisés.

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement

### Autres Plateformes
Le projet est compatible avec toutes les plateformes supportant Next.js.

## 📈 Analytics et Monitoring

- **Google Analytics** - Suivi des utilisateurs
- **Microsoft Clarity** - Heatmaps et sessions
- **Sentry** - Monitoring d'erreurs (optionnel)

## 🔒 Sécurité

- Authentification sécurisée avec Clerk
- Row Level Security (RLS) sur Supabase
- Validation des données avec Zod
- Protection CSRF
- Headers de sécurité configurés

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

Inspiré par [taap.it](https://taap.it/fr) - Une excellente plateforme de gestion de liens.

---

**LinkHive** - Créez votre page link-in-bio personnalisée avec QR codes et analytics 🚀
