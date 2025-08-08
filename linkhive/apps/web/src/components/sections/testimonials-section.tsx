'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Théo Gouman',
    role: 'CEO & Co-fondateur',
    content: 'LinkHive a transformé notre façon de gérer nos liens. Les analytics sont incroyables !',
    avatar: '/avatars/theo.jpg',
  },
  {
    name: 'Louis - Osmose',
    role: 'Influenceur',
    content: 'Parfait pour mes réseaux sociaux. Mes followers adorent ma page personnalisée.',
    avatar: '/avatars/louis.jpg',
  },
  {
    name: 'Romain Brunel',
    role: 'Entrepreneur',
    content: 'Les QR codes personnalisés m\'ont permis de booster mes événements.',
    avatar: '/avatars/romain.jpg',
  },
  {
    name: 'Nouralia Kajout',
    role: 'Créatrice de contenu',
    content: 'Interface intuitive et résultats impressionnants. Je recommande !',
    avatar: '/avatars/nouralia.jpg',
  },
  {
    name: 'Jules Loubie',
    role: 'Marketing Manager',
    content: 'Les liens courts avec analytics nous ont aidés à optimiser nos campagnes.',
    avatar: '/avatars/jules.jpg',
  },
  {
    name: 'Deborah Achour',
    role: 'Consultante',
    content: 'Un outil professionnel qui répond parfaitement à nos besoins.',
    avatar: '/avatars/deborah.jpg',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              TÉMOIGNAGES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Leurs avis valent mieux que tous nos arguments
            </h2>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
