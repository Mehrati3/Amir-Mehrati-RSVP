"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const STICKERS = ["💍", "✨", "🥂", "💌", "🌹", "🎉", "💫", "🫶", "🌸", "💕"];

export default function GallerySection() {
  const [hovered, setHovered] = useState<number | null>(null);

  const mediaItems = [
    { type: "image", url: "/2018.jpeg", title: "Best Friends", tag: "2018", gridClass: "md:col-span-4 h-[380px]", sticker: "🫶", vibe: "Where it all began 🌟" },
    { type: "image", url: "/2022.jpeg", title: "First meet after the confession", tag: "2022", gridClass: "md:col-span-4 h-[380px]", sticker: "💌", vibe: "Heart = stolen 💘" },
    { type: "image", url: "/2023.jpeg", title: "Second time in Egypt", tag: "2023", gridClass: "md:col-span-4 h-[380px]", sticker: "🌸", vibe: "Egypt called, we answered ✈️" },
    { type: "image", url: "/11.jpeg", title: "The Promise", tag: "2025", gridClass: "md:col-span-4 h-[380px]", sticker: "🌹", vibe: "Pinky promise, forever 🤙" },
    { type: "image", url: "/2222.jpeg", title: "Love", tag: "2025", gridClass: "md:col-span-4 h-[380px]", sticker: "💕", vibe: "This is the one 😍" },
    { type: "image", url: "/33.jpeg", title: "Laughter", tag: "2026", gridClass: "md:col-span-4 h-[380px]", sticker: "🎉", vibe: "Giggling forever 😂" },
    { type: "video", url: "/spin.mp4", title: "Hand in Hand", tag: "Chapters of Us", gridClass: "md:col-span-4 h-[380px]", sticker: "💫", vibe: "Dizzy in love ✨" },
    { type: "image", url: "/proposal.jpeg", title: "Proposal", tag: "16/1/2026", gridClass: "md:col-span-8 h-[380px]", sticker: "💍", vibe: "The big moment!! 🫣" },
    { type: "image", url: "/66.jpeg", title: "Will you marry me?", tag: "16/1/2026", gridClass: "md:col-span-8 h-[380px]", sticker: "🥂", vibe: "The question of a lifetime ✨" },
    { type: "image", url: "/55.jpeg", title: "Yes, a million times yes!", tag: "16/1/2026", gridClass: "md:col-span-4 h-[380px]", sticker: "🎉", vibe: "SHE SAID YES!!!! 🎊" },
    { type: "video", url: "/engagement2.mp4", title: "First Spin as Fiancés", tag: "24/1/2026", gridClass: "md:col-span-4 h-[450px]", sticker: "✨", vibe: "Round and round we go 💫💍" },
    { type: "image", url: "/MKP-8.jpg", title: "The Journey Begins", tag: "2026", gridClass: "md:col-span-8 h-[450px]", sticker: "🌟", vibe: "To be continued... 👀💕" },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  };

  const cardVariant = {
    initial: { opacity: 0, y: 35, scale: 0.97 },
    whileInView: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as const
    }
  };

  return (
    <section className="py-36 px-6 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Floating background stickers */}
        <div className="pointer-events-none select-none">
          {["💕", "✨", "🌸", "💫", "🎉"].map((s, i) => (
            <motion.span
              key={i}
              className="fixed text-3xl opacity-10"
              style={{ top: `${10 + i * 18}%`, left: i % 2 === 0 ? "2%" : "95%", zIndex: 0 }}
              animate={{ y: [0, -14, 0], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
            >
              {s}
            </motion.span>
          ))}
        </div>

        {/* Section Heading */}
        <motion.div {...fadeIn} className="text-center mb-24 relative">
          <motion.div
            className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-full px-4 py-1.5 mb-5 shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-lg">📸</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-400">Our Moments</span>
            <span className="text-lg">💖</span>
          </motion.div>

          <p className="text-3xl md:text-4xl font-light italic text-[#2C3E50] mb-2">
            Capturing our beautiful journey
          </p>
          <p className="text-sm text-[#1A3A3A]/40 italic mt-2">( yes, we're that couple 🥰 )</p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-xl">💍</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>

          {["🌸", "✨", "💕"].map((s, i) => (
            <motion.span
              key={i}
              className="absolute text-xl select-none pointer-events-none"
              style={{ top: `${i * 30}%`, right: `${8 + i * 5}%` }}
              animate={{ rotate: [0, 15, -10, 0], y: [0, -6, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {mediaItems.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              onHoverStart={() => setHovered(index)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setHovered(hovered === index ? null : index)}
              className={`${item.gridClass} relative group bg-stone-100 border-[3px] border-[#D4AF37]/60 p-1 rounded-xl shadow-[0_15px_45px_rgba(0,0,0,0.03)] transition-all duration-700 ease-out hover:border-[#D4AF37] hover:shadow-[0_25px_60px_rgba(212,175,55,0.22)] hover:-translate-y-1 cursor-pointer`}
            >

              {/* Sticker bubble — top right */}
              <motion.div
                className="absolute -top-4 -right-3 z-30 text-2xl drop-shadow-md select-none pointer-events-none"
                animate={hovered === index
                  ? { rotate: [0, -15, 15, -10, 0], scale: [1, 1.3, 1.1, 1.2, 1] }
                  : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 0.6 }}
              >
                {item.sticker}
              </motion.div>

              {/* Secondary sticker — bottom left on hover/tap */}
              <motion.div
                className="absolute -bottom-3 -left-3 z-30 text-xl drop-shadow select-none pointer-events-none"
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={hovered === index
                  ? { opacity: 1, scale: 1, rotate: -12 }
                  : { opacity: 0, scale: 0.5, rotate: -20 }
                }
                transition={{ duration: 0.35 }}
              >
                {STICKERS[(index + 3) % STICKERS.length]}
              </motion.div>

              {/* Gold corner ornaments */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#D4AF37]/50 z-20 transition-all duration-500 group-hover:top-1.5 group-hover:left-1.5 group-hover:border-white/60" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#D4AF37]/50 z-20 transition-all duration-500 group-hover:top-1.5 group-hover:right-1.5 group-hover:border-white/60" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#D4AF37]/50 z-20 transition-all duration-500 group-hover:bottom-1.5 group-hover:left-1.5 group-hover:border-white/60" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#D4AF37]/50 z-20 transition-all duration-500 group-hover:bottom-1.5 group-hover:right-1.5 group-hover:border-white/60" />

              {/* Inner gilded frame */}
              <div className="absolute inset-3 border border-[#D4AF37]/30 rounded pointer-events-none z-20 transition-all duration-700 ease-out group-hover:inset-2 group-hover:border-white/20" />

              {/* Media */}
              <div className="w-full h-full overflow-hidden rounded-[6px] relative">
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    muted autoPlay loop playsInline
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                )}

                {/* Dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500 z-10" />

                {/* Vibe caption — hover on desktop, tap on mobile */}
                <motion.div
                  className="absolute top-4 left-0 right-0 flex justify-center z-20 pointer-events-none"
                  initial={{ opacity: 0, y: -8 }}
                  animate={hovered === index ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="bg-white/90 backdrop-blur-sm text-[#2C3E50] text-[11px] font-semibold rounded-full px-3 py-1 shadow-md tracking-wide">
                    {item.vibe}
                  </span>
                </motion.div>
              </div>

              {/* Text badge */}
              <div className="absolute bottom-6 left-6 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500 z-20">
                <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-serif font-medium mb-1.5">
                  {item.tag}
                </p>
                <h4 className="text-lg font-light tracking-wide font-serif text-stone-50 drop-shadow-sm">
                  {item.title}
                </h4>
              </div>

              {/* Camera icon for photos */}
              {item.type === "image" && (
                <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    <Camera size={12} className="text-white" />
                  </div>
                </div>
              )}

              {/* Mobile tap hint — only shows when not active */}
              {hovered !== index && (
                <div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Fun footer */}
        <motion.div
          {...fadeIn}
          className="text-center mt-20 flex flex-col items-center gap-3"
        >
          <div className="flex gap-2 text-2xl">
            {["💕", "💍", "✨", "🥂", "🌸"].map((s, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
          <p className="text-sm text-[#1A3A3A]/40 italic">
            Every photo a memory, every memory a forever 💛
          </p>
        </motion.div>

      </div>
    </section>
  );
}