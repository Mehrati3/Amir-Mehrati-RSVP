"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

const mediaItems = [
  { type: "image", url: "/2018.jpeg",      date: "2018",           caption: "The Journey Begins — Day One",       radius: 120, speed: 22, phase: 0   },
  { type: "image", url: "/2022.jpeg",      date: "2022",           caption: "Milestone Unlocked: Big News Shared", radius: 120, speed: 22, phase: 120 },
  { type: "image", url: "/2023.jpeg",      date: "2023",           caption: "Bound for Cairo, Egypt",         radius: 120, speed: 22, phase: 240 },
  { type: "image", url: "/11.jpeg",         date: "2025",           caption: "Making a Solid Promise",          radius: 190, speed: 16, phase: 45  },
  { type: "image", url: "/2222.jpeg",      date: "2025",           caption: "Moments Worth Preserving",          radius: 190, speed: 16, phase: 165 },
  { type: "image", url: "/33.jpeg",         date: "2026",           caption: "Caught mid-laugh",                 radius: 190, speed: 16, phase: 285 },
  { type: "video", url: "/spin.mp4",        date: "Our Chapters",   caption: "A Quick Spin for the Record",       radius: 260, speed: 10, phase: 15  },
  { type: "image", url: "/proposal.jpeg",   date: "16 · 01 · 2026", caption: "The Moment Everything Changed",    radius: 260, speed: 10, phase: 105 },
  { type: "image", url: "/66.jpeg",         date: "16 · 01 · 2026", caption: "Asking the Question of a Lifetime", radius: 260, speed: 10, phase: 195 },
  { type: "image", url: "/55.jpeg",         date: "16 · 01 · 2026", caption: "Shouting Out the 'Yes'!",           radius: 260, speed: 10, phase: 285 },
  { type: "video", url: "/engagement2.mp4", date: "24 · 01 · 2026", caption: "Stepping Into Our Next Chapter",    radius: 330, speed: 6,  phase: 60  },
  { type: "image", url: "/MKP-8.jpg",       date: "2026",           caption: "The Adventure Continues... Stay Tuned", radius: 330, speed: 6,  phase: 240 },
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  // Smooth operational orbit loop counter ticker
  useEffect(() => {
    if (activeIndex !== null) return;
    let animationFrameId: number;
    const update = () => {
      setTime((prev) => prev + 0.012);
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeIndex]);

  return (
    <section className="py-24 lg:py-32 px-4 bg-[#FAF8F5] overflow-hidden relative select-none flex items-center justify-center min-h-[750px] sm:min-h-[850px] lg:min-h-[1000px]">
      
      {/* Background Stardust Micro-Dots Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#1A3A3A_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Minimal Floating Map Coordinate Header */}
        <div className="text-center mb-10 lg:mb-0 lg:absolute lg:top-0 lg:left-0 lg:text-left z-20">
          <div className="inline-flex items-center gap-1.5 opacity-40 text-[9px] font-mono tracking-[0.4em] uppercase mb-1 text-stone-800">
            <Compass size={10} className="animate-spin-slow" /> Constellation Viewport
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-extralight tracking-tight text-stone-800">Our Shared Orbit</h2>
          <p className="text-[10px] text-stone-400 italic font-serif mt-0.5">
            Tap nodes along the trajectory map paths to project archives
          </p>
        </div>

        {/* --- UNIVERSAL BOUNDLESS RESPONSIVE ORBIT COMPASS BOARD --- */}
        <div className="relative w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] flex items-center justify-center mt-6 lg:mt-12 scale-[1.05] sm:scale-100">
          
          {/* Responsive Ring Line Arrays */}
          {[120, 190, 260, 330].map((r, idx) => (
            <div 
              key={idx}
              className="absolute rounded-full border border-stone-300/35 pointer-events-none transition-all duration-500 scale-[0.45] sm:scale-[0.65] lg:scale-100"
              style={{ width: r * 2, height: r * 2 }}
            />
          ))}

          {/* Central Sun Gravitational Matrix Node */}
          <motion.div 
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white border border-stone-200/80 shadow-lg flex flex-col items-center justify-center p-1.5 z-10 text-center relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={12} className="text-[#D4AF37] mb-0.5 animate-pulse" />
            <span className="text-[7px] lg:text-[8px] font-mono tracking-[0.18em] font-bold text-stone-700 uppercase">May 08</span>
            <span className="text-[8px] lg:text-[9px] font-serif italic text-stone-400">2027</span>
            <div className="absolute -inset-1.5 border border-[#D4AF37]/20 rounded-full animate-ping opacity-30 [animation-duration:3s]" />
          </motion.div>

          {/* Dynamic Nodes Loop Engine */}
          {mediaItems.map((item, i) => {
            const currentAngle = (time * item.speed) + item.phase;
            const radians = (currentAngle * Math.PI) / 180;
            
            const rawX = Math.cos(radians) * item.radius;
            const rawY = Math.sin(radians) * item.radius;

            return (
              <motion.div
                key={i}
                onClick={() => setActiveIndex(i)}
                // FIX: Single unified className property combining layout, dimensional shapes, and CSS variable dynamic scaling properties cleanly
                className="absolute w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-lg sm:rounded-xl bg-white p-0.5 sm:p-1 border border-stone-200/70 shadow-sm cursor-pointer group z-20 hover:border-[#D4AF37]/80 flex items-center justify-center [--scale-multiplier:0.45] sm:[--scale-multiplier:0.65] lg:[--scale-multiplier:1]"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%)`,
                  x: `calc(var(--responsive-x, ${rawX}px))`,
                  y: `calc(var(--responsive-y, ${rawY}px))`,
                  // @ts-ignore custom CSS variables configured cleanly via tailwind responsive handles
                  '--responsive-x': `calc(${rawX}px * var(--scale-multiplier, 1))`,
                  '--responsive-y': `calc(${rawY}px * var(--scale-multiplier, 1))`,
                }}
                whileHover={{ scale: 1.15, zIndex: 50 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <div className="w-full h-full rounded-md sm:rounded-lg overflow-hidden relative bg-stone-100">
                  {item.type === "video" ? (
                    <video src={item.url} muted autoPlay loop playsInline className="w-full h-full object-cover pointer-events-none" />
                  ) : (
                    <img src={item.url} alt="" className="w-full h-full object-cover pointer-events-none" />
                  )}
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Micro Floating Year Flag Capsule */}
                <div className="absolute -bottom-1.5 -right-1 bg-stone-900 text-white font-mono text-[5px] sm:text-[6px] lg:text-[7px] tracking-widest px-1 py-0.5 rounded-sm shadow opacity-70 group-hover:opacity-100 group-hover:bg-[#D4AF37] group-hover:text-stone-900 transition-all">
                  {item.date.split(" · ").pop()}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- CINEMATIC FOCAL PROJECTION DECK MODAL --- */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-950/98 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4"
              onClick={() => setActiveIndex(null)}
            >
              <button 
                onClick={() => setActiveIndex(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-white flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
              >
                <X size={12} /> Close
              </button>

              <div 
                className="relative max-w-4xl w-full flex flex-col items-center gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Active Showcase Asset Panel */}
                <motion.div
                  initial={{ scale: 0.96, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.96, y: 15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  className="w-full h-[65vw] sm:h-[450px] bg-stone-900 rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl"
                >
                  {mediaItems[activeIndex].type === "video" ? (
                    <video src={mediaItems[activeIndex].url} controls autoPlay loop playsInline className="w-full h-full object-contain" />
                  ) : (
                    <img src={mediaItems[activeIndex].url} alt="" className="w-full h-full object-contain" />
                  )}
                </motion.div>

                {/* Subtitle Annotation Deck Context Details label fields */}
                <div className="w-full text-center max-w-xl px-4">
                  <motion.p 
                    key={`cap-${activeIndex}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-base sm:text-lg font-serif font-light tracking-wide leading-relaxed"
                  >
                    {mediaItems[activeIndex].caption}
                  </motion.p>
                  <div className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] mt-3 opacity-60">
                    Timestamp // {mediaItems[activeIndex].date}
                  </div>
                </div>

                {/* Interactive Slider Stepper Navigation Paddles */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveIndex((activeIndex - 1 + mediaItems.length) % mediaItems.length); }}
                  className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all hover:bg-white/10"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveIndex((activeIndex + 1) % mediaItems.length); }}
                  className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all hover:bg-white/10"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}