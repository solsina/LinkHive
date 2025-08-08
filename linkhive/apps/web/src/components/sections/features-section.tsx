'use client';

import { Button } from '@linkhive/ui';
import { ArrowRight, Smartphone, QrCode, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Link in Bio',
    subtitle: 'Créez un Link in Bio qui fait toute la différence',
    description: 'Personnalisez votre page Link in Bio, ajoutez vos liens et suivez vos performances en temps réel.',
    icon: Smartphone,
    buttonText: 'Créer mon Link in Bio',
    href: '/sign-up',
    image: '/images/link-in-bio-preview.png',
  },
  {
    title: 'QR Codes',
    subtitle: 'Créez des QR Codes qui vous ressemblent',
    description: 'Générez des QR codes personnalisables, suivez les scans et créez différents types (URL, Wi-Fi, PDF).',
    icon: QrCode,
    buttonText: 'Créer mon QR Code',
    href: '/sign-up',
    image: '/images/qr-code-preview.png',
  },
  {
    title: 'Short Links',
    subtitle: 'Créez des liens courts qui vous rapportent',
    description: 'Créez des liens courts, utilisez des domaines personnalisés et accédez à des analytics détaillés.',
    icon: LinkIcon,
    buttonText: 'Créer mon lien court',
    href: '/sign-up',
    image: '/images/short-links-preview.png',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Trois façons de l'essayer
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choisissez l'outil qui correspond le mieux à vos besoins
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-card border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <h4 className="text-lg font-semibold text-foreground">
                      {feature.subtitle}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Preview Image */}
                  <div className="mt-8 mb-6">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <feature.icon className="w-12 h-12 text-primary/40 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Aperçu {feature.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button asChild className="w-full" size="lg">
                    <Link href={feature.href}>
                      {feature.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
