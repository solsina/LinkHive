'use client';

import { Button } from '@linkhive/ui';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function AnalyticsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
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
              <TrendingUp className="w-4 h-4 mr-2" />
              ANALYTICS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Suivez vos statistiques en temps réel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Créez des liens, clients, QR Codes, et suivez tout, c'est encore mieux.
            </p>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card border rounded-2xl p-8 shadow-xl"
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stats Cards */}
              <div className="space-y-4">
                <div className="bg-primary/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">25</span>
                  </div>
                  <p className="text-muted-foreground">Liens créés</p>
                </div>
                
                <div className="bg-primary/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">242 000</span>
                  </div>
                  <p className="text-muted-foreground">Clics générés</p>
                </div>
              </div>

              {/* Main Chart */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Vous avez généré{' '}
                      <span className="text-primary font-bold">242 000</span> clics au total
                    </h3>
                  </div>
                  
                  {/* Chart Placeholder */}
                  <div className="relative h-32 bg-white/50 rounded-lg p-4">
                    <div className="flex items-end justify-between h-full">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-8 bg-primary rounded-t"
                          style={{
                            height: `${Math.random() * 60 + 20}%`,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Time Range Selectors */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {['1H', '24H', '7J', '30J', 'ALL'].map((period) => (
                        <button
                          key={period}
                          className="px-2 py-1 text-xs rounded bg-white/70 hover:bg-white transition-colors"
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
