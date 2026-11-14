
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Church,
  MapPin,
  Navigation,
  GlassWater,
  Clock,
  Sparkles,
  Music2,
} from "lucide-react";

const ceremonyMap =
  "https://maps.app.goo.gl/ejG3Rn8KRsWZf44t9?g_st=iw";

const afterPartyMap =
  "https://maps.app.goo.gl/ZpxHK6Z1m7SHUPxSA?g_st=iw";

export default function DetailsSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9 },
  };

  return (
    <section className="relative py-28 px-6 bg-[#FDFBF7] overflow-hidden">

      {/* Soft lavender and olive decorations */}
      <div className="absolute -left-40 top-20 w-96 h-48 bg-[#E9E2EF] blur-3xl opacity-40 rounded-full" />
      <div className="absolute -right-40 bottom-20 w-96 h-48 bg-[#E6E9DB] blur-3xl opacity-50 rounded-full" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div {...fadeIn} className="text-center mb-16">

          <p className="text-[#8A7950] text-[10px] uppercase tracking-[0.45em] font-semibold mb-5">
            A day to remember
          </p>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#354536]">
            Join us for our day
          </h2>

          <div className="flex justify-center items-center gap-4 mt-7">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C4A46A]" />
            <span className="text-[#C4A46A]">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C4A46A]" />
          </div>
        </motion.div>

        {/* Wedding Date */}
        <motion.div
          {...fadeIn}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="w-20 h-20 rounded-full bg-white border border-[#C4A46A]/30 shadow-sm flex items-center justify-center mb-6">
            <CalendarDays
              className="text-[#9A855A]"
              size={29}
              strokeWidth={1.2}
            />
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A7950] font-semibold">
            Save the date
          </p>

          <h3 className="font-serif text-3xl md:text-4xl text-[#354536] mt-4">
            Saturday, February 6th, 2027
          </h3>

          <p className="text-stone-400 mt-3 font-light tracking-wide">
            A beautiful beginning to our forever
          </p>
        </motion.div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Ceremony */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="group relative bg-white/90 border border-[#D7CCB2]/50 p-9 md:p-12 text-center shadow-[0_20px_60px_rgba(40,30,20,0.05)] hover:-translate-y-1 transition-transform duration-500"
          >

            <div className="w-16 h-16 mx-auto rounded-full bg-[#F0EDF3] border border-[#DDD3E6] flex items-center justify-center mb-7">
              <Church className="text-[#82708F]" size={26} strokeWidth={1.2} />
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A7950] font-semibold">
              The Ceremony
            </p>

            <h3 className="font-serif text-2xl md:text-3xl text-[#354536] mt-4">
              Saint Mary and
              <br />
              Saint Beshoy Church
            </h3>

            <div className="flex justify-center items-center gap-2 mt-6 text-stone-500">
              <Clock size={15} className="text-[#A18C62]" />
              <p className="text-xl tracking-wide">6:00 PM</p>
            </div>

            <a
              href={ceremonyMap}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-[#C4A46A]/50 text-[#8A7950] text-[10px] uppercase tracking-[0.2em] hover:bg-[#C4A46A] hover:text-white transition-all duration-300"
            >
              <Navigation size={13} />
              Get Directions
            </a>

          </motion.div>

          {/* After Party */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="group relative bg-white/90 border border-[#D7CCB2]/50 p-9 md:p-12 text-center shadow-[0_20px_60px_rgba(40,30,20,0.05)] hover:-translate-y-1 transition-transform duration-500"
          >

            <div className="w-16 h-16 mx-auto rounded-full bg-[#EDF0E7] border border-[#D8DFCD] flex items-center justify-center mb-7">
              <GlassWater className="text-[#71805F]" size={26} strokeWidth={1.2} />
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8A7950] font-semibold">
              The Wedding Celebration
            </p>

            <h3 className="font-serif text-2xl md:text-3xl text-[#354536] mt-4">
              La Novia Venue
            </h3>

            <p className="text-sm text-stone-400 mt-4 font-light">
              Let the celebrations begin!
            </p>

            <div className="flex justify-center items-center gap-2 mt-5 text-stone-500">
              <Clock size={15} className="text-[#A18C62]" />
              <p className="text-xl tracking-wide">
                8:00 PM
              </p>
            </div>

            <div className="flex justify-center items-center gap-2 mt-3 text-[#71805F]">
              <Music2 size={15} />
              <p className="text-xs tracking-wide">
                Dinner • Music • Dancing
              </p>
            </div>

            <a
              href={afterPartyMap}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-[#C4A46A]/50 text-[#8A7950] text-[10px] uppercase tracking-[0.2em] hover:bg-[#C4A46A] hover:text-white transition-all duration-300"
            >
              <Navigation size={13} />
              Get Directions
            </a>

          </motion.div>
        </div>

        

      </div>
    </section>
  );
}
