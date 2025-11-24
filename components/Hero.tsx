import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface HeroProps {
  tagline: string;
  headline: string;
  subline: string;
  onOpenModal?: () => void;
}

export default function Hero({ tagline, headline, subline, onOpenModal }: HeroProps) {
  const scrollToSection = (hash: string) => {
    if (hash.startsWith('#')) {
      hash = hash.substring(1);
    }
    const element = document.getElementById(hash);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const hash = href.substring(2); // Remove '/#'
      scrollToSection(hash);
    }
  };
  return (
    <section className="relative isolate overflow-hidden min-h-[85vh] flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(31, 42, 55, 0.85) 0%, rgba(165, 28, 48, 0.75) 100%), url('/s1/s1-bg.jpg')`,
          backgroundPosition: 'top ',
          backgroundRepeat: 'no-repeat',
        }} 
      />
      {/* https://picsum.photos/2400/1600?grayscale */}
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 pb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="kicker text-white/90 mb-6 border-l-2 border-crimson pl-4">
              {tagline}
            </p>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-[1.1] font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering Growth.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Elevating Futures.
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subline}
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onOpenModal) {
                  onOpenModal();
                }
              }}
              className="px-8 py-4 bg-white text-slateInk hover:text-crimson rounded-full font-semibold text-base transition-all hover:shadow-lg hover:shadow-white/20"
            >
              Start Your Journey
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onOpenModal) {
                  onOpenModal();
                }
              }}
              className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold text-base hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Explore Programs
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}