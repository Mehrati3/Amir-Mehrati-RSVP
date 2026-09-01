"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Church,
  MapPin,
  Navigation,
  GlassWater,
} from "lucide-react";

const ceremonyMap =
  "https://maps.app.goo.gl/ejG3Rn8KRsWZf44t9?g_st=iw";

const afterPartyMap =
  "https://maps.app.goo.gl/ZpxHK6Z1m7SHUPxSA?g_st=iw";

export default function DetailsSection() {
  const fadeIn = {
    initial: {
      opacity: 0,
      y: 40,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.2,
    },
    transition: {
      duration: 0.9,
    },
  };

  return (
    <section className="relative py-32 px-6 bg-[#FDFBF7] overflow-hidden">

      {/* Decorative clouds */}

      <div className="absolute -left-40 top-20 w-96 h-48 bg-white blur-3xl opacity-70 rounded-full" />
      <div className="absolute -right-40 bottom-20 w-96 h-48 bg-white blur-3xl opacity-70 rounded-full" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}

        <motion.div
          {...fadeIn}
          className="text-center mb-20"
        >
          <p className="text-[#A67C1E] text-[10px] uppercase tracking-[0.45em] font-semibold mb-5">
            The details
          </p>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#263737]">
            Join us for our day
          </h2>

          <div className="flex justify-center items-center gap-4 mt-7">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[#D4AF37]">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        {/* Date */}

        <motion.div
          {...fadeIn}
          className="flex flex-col items-center text-center mb-24"
        >
          <div className="w-20 h-20 rounded-full bg-white border border-[#D4AF37]/20 shadow-sm flex items-center justify-center mb-7">
            <CalendarDays
              className="text-[#D4AF37]"
              size={30}
              strokeWidth={1.2}
            />
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-[#A67C1E] font-semibold">
            Save the date
          </p>

          <h3 className="font-serif text-3xl md:text-4xl text-[#263737] mt-4">
            Saturday, February 6th, 2027
          </h3>

          <p className="text-stone-400 mt-3 font-light tracking-wide">
            Ceremony begins at 6:00 PM
          </p>
        </motion.div>

        {/* Locations */}

        <div className="grid md:grid-cols-2 gap-10">

          {/* Church */}

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="group bg-white/80 backdrop-blur-sm border border-[#D4AF37]/15 p-8 md:p-12 text-center shadow-[0_20px_60px_rgba(40,30,20,0.05)]"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50/50 border border-rose-100 flex items-center justify-center mb-7">
              <Church
                className="text-[#D4AF37]"
                size={26}
                strokeWidth={1.2}
              />
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A67C1E] font-semibold">
              The Ceremony
            </p>

            <h3 className="font-serif text-2xl md:text-3xl text-[#263737] mt-4">
              Saint Mary and
              <br />
              Saint Beshoy Church
            </h3>

            <p className="text-sm text-stone-400 mt-4">
              6:00 PM
            </p>

            <motion.a
              href={ceremonyMap}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-[#D4AF37]/40 text-[#A67C1E] text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
            >
              <Navigation size={13} />
              Open in Google Maps
            </motion.a>
          </motion.div>

          {/* After Party */}

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="group bg-white/80 backdrop-blur-sm border border-[#D4AF37]/15 p-8 md:p-12 text-center shadow-[0_20px_60px_rgba(40,30,20,0.05)]"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50/50 border border-rose-100 flex items-center justify-center mb-7">
              <GlassWater
                className="text-[#D4AF37]"
                size={26}
                strokeWidth={1.2}
              />
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A67C1E] font-semibold">
              The After Party
            </p>

            <h3 className="font-serif text-2xl md:text-3xl text-[#263737] mt-4">
              La Novia Venue
            </h3>

            <p className="text-sm text-stone-400 mt-4">
              Dinner • Celebration • Dancing
            </p>

            <motion.a
              href={afterPartyMap}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-[#D4AF37]/40 text-[#A67C1E] text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
            >
              <MapPin size={13} />
              Open in Google Maps
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}