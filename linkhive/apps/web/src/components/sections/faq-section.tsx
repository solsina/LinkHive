'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "C'est quoi LinkHive ?",
    answer: "LinkHive est une plateforme tout-en-un qui vous permet de créer des pages Link in Bio personnalisées, des QR codes et des liens courts avec des analytics détaillées.",
  },
  {
    question: 'Comment LinkHive fonctionne ?',
    answer: "C'est simple ! Créez votre compte, personnalisez votre page avec vos liens, et partagez l'URL unique. Vos visiteurs peuvent alors accéder à tous vos liens en un seul clic.",
  },
  {
    question: "Y a-t-il une différence entre Link in Bio et Linktree ?",
    answer: "LinkHive offre plus de fonctionnalités que Linktree : QR codes personnalisables, analytics avancées, domaines personnalisés et une interface plus moderne.",
  },
  {
    question: 'Est-ce que LinkHive est gratuit ?',
    answer: "Oui ! LinkHive propose un plan gratuit avec des fonctionnalités de base. Pour plus de fonctionnalités, nous proposons un plan Pro à 9€/mois.",
  },
  {
    question: 'Puis-je utiliser mon propre nom de domaine ?',
    answer: "Oui, avec le plan Pro, vous pouvez connecter votre propre domaine personnalisé pour une expérience encore plus professionnelle.",
  },
  {
    question: 'Comment contacter le service client ?',
    answer: "Notre équipe support est disponible 24/7. Contactez-nous via le chat en ligne ou par email à support@linkhive.com",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Encore des questions ? On a les réponses
            </h2>
            <p className="text-xl text-muted-foreground">
              Consultez notre centre d'aide ou contactez-nous
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-foreground">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
