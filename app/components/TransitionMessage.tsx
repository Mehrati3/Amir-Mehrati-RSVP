
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Flower2,
  Stars,
  Minus,
  Plus,
  Check,
  UtensilsCrossed,
} from "lucide-react";
const COLORS = {
  cream: "#F6F0E7",
  paper: "#FCF8F1",
  paperLight: "#FFFDF9",
  lavender: "#9A8EAA",
  lavenderDark: "#887A99",
  lavenderLight: "#A99ABB",
  lavenderPale: "#EEE8F2",
  lavenderMist: "#F5F0F7",
  olive: "#7A8065",
  oliveLight: "#E7E9DC",
  olivePale: "#F1F2EA",
  text: "#403B3A",
  muted: "#7C7671",
  lightText: "#A29B95",
  border: "#DDD5DD",
};

const fadeIn = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9 },
  };

export default function TransitionMessage() {
  return (
    <section
      className="relative overflow-hidden px-4 pt-4 pb-12 sm:px-6 md:pt-8 md:pb-16 lg:px-8"
      style={{ background:
          "linear-gradient(145deg, #F9F6F9 0%, #FDFBF7 50%, #F0F0E9 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto mt-4 max-w-2xl border px-6 py-10 text-center sm:px-10"
        style={{ borderColor: `${COLORS.lavender}45` }}
      >
        <Sparkles
          className="mx-auto mb-5"
          style={{ color: "#B6A078" }}
          size={22}
          strokeWidth={1.2}
        />

        <p
          className="font-serif text-xl italic leading-relaxed md:text-2xl"
          style={{ color: "#657454" }}
        >
          From a blessed beginning to a night
          filled with love, laughter and dancing...
        </p>

        <p
          className="mt-6 text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "#A18C62" }}
        >
          We can't wait to celebrate with you
        </p>
      </motion.div>
    </section>
  );
}
