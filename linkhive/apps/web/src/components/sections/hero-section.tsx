'use client';

import { Button } from '@linkhive/ui';
import { ArrowRight, Play, Users } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
          >
            Une solution{' '}
            <span className="gradient-text">tout-en-un</span>
            <br />
            pour gérer tous vos liens
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Créez de meilleurs, incroyables, ceux-là et QR Codes avec LinkHive
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-foreground text-background hover:bg-foreground/90">
              <Link href="/sign-up">
                Créer mon compte
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Voir la démo
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-background"
                />
              ))}
            </div>
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Rejoignez les 242 000 utilisateurs
            </span>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -top-4 -right-4 bg-background/80 backdrop-blur-sm rounded-2xl p-4 border shadow-lg">
              <p className="text-sm font-medium">Qu'est-ce que c'est?</p>
            </div>
            <Button
              size="icon"
              className="w-16 h-16 rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <Play className="h-6 w-6" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Visual Feature Overview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="relative">
          {/* Central Arrow */}
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-full opacity-20 blur-xl" />
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-16 h-2 bg-foreground rounded-full relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-foreground rounded-full" />
              </div>
            </div>
          </div>
          
          {/* Floating Icons */}
          <div className="absolute inset-0">
            {[
              { x: -20, y: -20, color: 'from-green-400 to-green-600' },
              { x: 20, y: -20, color: 'from-purple-400 to-purple-600' },
              { x: -20, y: 20, color: 'from-orange-400 to-orange-600' },
              { x: 20, y: 20, color: 'from-blue-400 to-blue-600' },
            ].map((icon, i) => (
              <div
                key={i}
                className={`absolute w-8 h-8 bg-gradient-to-br ${icon.color} rounded-lg opacity-60 blur-sm`}
                style={{
                  left: `${50 + icon.x}%`,
                  top: `${50 + icon.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>
        </div>
        
        <p className="text-lg font-medium text-muted-foreground">
          Un outil, trois façons de l'essayer
        </p>
      </motion.div>
    </section>
  );
}
