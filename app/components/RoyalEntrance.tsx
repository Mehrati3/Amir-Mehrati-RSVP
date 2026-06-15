"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoyalEntranceProps {
  curtainsOpen: boolean;
  view: 'invite' | 'admin';
}

export default function RoyalEntrance({ curtainsOpen, view }: RoyalEntranceProps) {
  if (view !== 'invite') return null;

  return (
    <AnimatePresence>
      {!curtainsOpen && (
        <div className="pointer-events-none fixed inset-0 z-40 flex overflow-hidden">
          {/* Left Swinging Drape */}
          <motion.div
            initial={{ x: 0, rotateY: 0, opacity: 1 }}
            exit={{ 
              x: "-100%", 
              rotateY: [0, -12, 6, -2, 0],
              opacity: 0 
            }}
            transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-auto h-full w-1/2 bg-gradient-to-r from-stone-100 via-white to-stone-50/95 relative border-r border-[#D4AF37]/10 origin-left"
            style={{ perspective: 1200 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.01)_50%,transparent_100%)]" />
            <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-[#D4AF37]/20" />
          </motion.div>

          {/* Right Swinging Drape */}
          <motion.div
            initial={{ x: 0, rotateY: 0, opacity: 1 }}
            exit={{ 
              x: "100%", 
              rotateY: [0, 12, -6, 2, 0],
              opacity: 0 
            }}
            transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-auto h-full w-1/2 bg-gradient-to-l from-stone-100 via-white to-stone-50/95 relative border-l border-[#D4AF37]/10 origin-right"
            style={{ perspective: 1200 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(-90deg,transparent_0%,rgba(0,0,0,0.01)_50%,transparent_100%)]" />
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-[#D4AF37]/20" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}