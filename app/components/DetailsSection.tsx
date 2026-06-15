"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Church, MapPin } from 'lucide-react';

export default function DetailsSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <section className="py-36 px-6 max-w-5xl mx-auto border-t border-rose-100/60 bg-[#FDFBF7]">
      <div className="grid md:grid-cols-3 gap-16 text-center">
        <motion.div {...fadeIn} className="flex flex-col items-center group">
          <div className="w-16 h-16 rounded-full bg-rose-50/60 border border-rose-100/50 flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#D4AF37]/10 transition-colors duration-500">
            <Calendar className="text-[#D4AF37]" size={26} strokeWidth={1.5} />
          </div>
          <h3 className="font-sans font-semibold uppercase tracking-[0.2em] mb-3 text-[#A67C1E] text-xs">The Date</h3>
          <p className="text-xl font-light font-serif text-slate-800">Saturday, May 8th, 2027</p>
          <p className="text-slate-400 mt-2 text-sm font-light">4:30 in the Afternoon</p>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex flex-col items-center group">
          <div className="w-16 h-16 rounded-full bg-rose-50/60 border border-rose-100/50 flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#D4AF37]/10 transition-colors duration-500">
            <Church className="text-[#D4AF37]" size={26} strokeWidth={1.5} />
          </div>
          <h3 className="font-sans font-semibold uppercase tracking-[0.2em] mb-3 text-[#A67C1E] text-xs">The Ceremony</h3>
          <p className="text-xl font-light font-serif text-slate-800">St. Bishoy Church Grounds</p>
          <p className="text-slate-400 mt-2 text-sm font-light">Wadi El Natrun, Egypt</p>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="flex flex-col items-center group">
          <div className="w-16 h-16 rounded-full bg-rose-50/60 border border-rose-100/50 flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#D4AF37]/10 transition-colors duration-500">
            <MapPin className="text-[#D4AF37]" size={26} strokeWidth={1.5} />
          </div>
          <h3 className="font-sans font-semibold uppercase tracking-[0.2em] mb-3 text-[#A67C1E] text-xs">The Reception</h3>
          <p className="text-xl font-light font-serif text-slate-800">Followed by an</p>
          <p className="text-slate-400 mt-2 text-sm font-light">Outdoor Dinner & Celebration</p>
        </motion.div>
      </div>
    </section>
  );
}