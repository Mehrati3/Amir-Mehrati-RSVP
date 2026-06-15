"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  curtainsOpen: boolean;
}

export default function HeroSection({ curtainsOpen }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center p-4">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1545562019-968b9115855e?q=80&w=2070&auto=format&fit=crop')`,
          filter: 'brightness(0.65)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FDFBF7] z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={curtainsOpen ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 bg-white/85 p-8 md:p-24 rounded-[32px] border border-white/60 shadow-[0_30px_90px_rgba(0,0,0,0.06)] cursor-pointer max-w-4xl mx-auto w-full md:w-auto overflow-hidden"
        onClick={() => confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#D4AF37', '#FFFFFF', '#FCE7F3'] })}
      >
        
        {/* ================= LEFT SIDE TOAST: AMIR'S ACCIDENT (FIXED FOR MOBILE) ================= */}
        <AnimatePresence>
          {curtainsOpen && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4, delay: 2.5 } }}
              className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 pointer-events-none flex items-center justify-center h-16 w-24 transform scale-75 sm:scale-100 origin-top-left"
            >
              {/* Left Glass */}
              <motion.div
                initial={{ rotate: -45, x: -50, opacity: 0 }}
                animate={{ rotate: [ -45, 25, 12, 12 ], x: [ -50, 12, 0, 0 ], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.6, times: [0, 0.3, 0.5, 0.95], ease: "easeOut", delay: 0.5 }}
                className="origin-bottom-right"
              >
                <svg width="26" height="42" viewBox="0 0 32 48" fill="none" className="text-[#D4AF37]">
                  <path d="M6 4C6 4 5 22 16 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M26 4C26 4 27 22 16 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="16" y1="22" x2="16" y2="38" stroke="currentColor" strokeWidth="2.5"/>
                  <path d="M10 38H22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </motion.div>

              {/* "KABOOM!" Bubble Text */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.8, times: [0, 0.2, 0.8, 1], delay: 1.2 }}
                className="absolute -top-4 font-sans font-black bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded text-[9px] tracking-tighter border border-slate-900 shadow-sm whitespace-nowrap"
              >
                KABOOM!
              </motion.div>

              {/* Right Glass */}
              <motion.div
                initial={{ rotate: 45, x: 50, opacity: 0 }}
                animate={{ rotate: [ 45, -25, -12, -12 ], x: [ 50, -12, 0, 0 ], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.6, times: [0, 0.3, 0.5, 0.95], ease: "easeOut", delay: 0.5 }}
                className="origin-bottom-left"
              >
                <svg width="26" height="42" viewBox="0 0 32 48" fill="none" className="text-[#D4AF37] transform scale-x-[-1]">
                  <path d="M6 4C6 4 5 22 16 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M26 4C26 4 27 22 16 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="16" y1="22" x2="16" y2="38" stroke="currentColor" strokeWidth="2.5"/>
                  <path d="M10 38H22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= RIGHT SIDE TOAST: MEHRATI'S SURPRISE (FIXED FOR MOBILE) ================= */}
        <AnimatePresence>
          {curtainsOpen && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4, delay: 2.5 } }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 pointer-events-none flex items-center justify-center h-16 w-24 transform scale-75 sm:scale-100 origin-top-right"
            >
              {/* Left Glass */}
              <motion.div
                initial={{ rotate: -45, x: -50, opacity: 0 }}
                animate={{ rotate: [ -45, 25, 12, 12 ], x: [ -50, 12, 0, 0 ], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.6, times: [0, 0.3, 0.5, 0.95], ease: "easeOut", delay: 0.7 }}
                className="origin-bottom-right"
              >
                <svg width="26" height="42" viewBox="0 0 32 48" fill="none" className="text-[#D4AF37]">
                  <path d="M6 4C6 4 5 22 16 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M26 4C26 4 27 22 16 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="16" y1="22" x2="16" y2="38" stroke="currentColor" strokeWidth="2.5"/>
                  <path d="M10 38H22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </motion.div>

              {/* "CHEERS!" Pop Text */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.8, times: [0, 0.2, 0.8, 1], delay: 1.4 }}
                className="absolute -top-4 font-sans font-black bg-[#1A3A3A.] text-black px-1.5 py-0.5 rounded text-[9px] tracking-tighter border border-[#D4AF37] shadow-sm whitespace-nowrap"
              >
                CHEERS! 🎉
              </motion.div>

              {/* Right Glass */}
              <motion.div
                initial={{ rotate: 45, x: 50, opacity: 0 }}
                animate={{ rotate: [ 45, -25, -12, -12 ], x: [ 50, -12, 0, 0 ], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.6, times: [0, 0.3, 0.5, 0.95], ease: "easeOut", delay: 0.7 }}
                className="origin-bottom-left"
              >
                <svg width="26" height="42" viewBox="0 0 32 48" fill="none" className="text-[#D4AF37] transform scale-x-[-1]">
                  <path d="M6 4C6 4 5 22 16 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M26 4C26 4 27 22 16 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="16" y1="22" x2="16" y2="38" stroke="currentColor" strokeWidth="2.5"/>
                  <path d="M10 38H22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Intricate Card Framing Borders */}
        <div className="absolute inset-4 border border-[#D4AF37]/25 rounded-[24px] pointer-events-none" />
        <div className="absolute inset-5 border border-[#D4AF37]/10 rounded-[20px] pointer-events-none" />

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex justify-center mb-8"
        >
          <div className="p-3 bg-rose-50/50 rounded-full border border-rose-100/40 shadow-sm">
            <Heart className="text-rose-400 fill-rose-400/20" size={24} strokeWidth={1.5} />
          </div>
        </motion.div>
        
        <h2 className="uppercase tracking-[0.55em] text-[#1A3A3A.] text-xs font-semibold mb-6 opacity-90">
          Together with their families
        </h2>
        
        <h1 className="text-5xl md:text-8xl font-extralight text-[#1A3A3A.] mb-8 tracking-tight font-serif">
          Amir <span className="text-[#D4AF37] font-normal italic">&</span> Mehrati
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <Heart className="text-[#D4AF37] fill-[#D4AF37]/10" size={12} />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        
        <p className="text-base md:text-xl text-[#1A3A3A.] font-light tracking-[0.25em] uppercase">
          May 08, 2027 <span className="text-[#D4AF37] mx-2">•</span> Egypt
        </p>
      </motion.div>
    </section>
  );
}