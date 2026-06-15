"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface RsvpSectionProps {
  submitted: boolean;
  guestCount: number;
  loading: boolean;
  setGuestCount: (count: number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function RsvpSection({ submitted, guestCount, loading, setGuestCount, onSubmit }: RsvpSectionProps) {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <section className="py-28 bg-[#1A3A3A] px-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-10" />
      <motion.div 
        {...fadeIn}
        className="max-w-3xl mx-auto border border-[#D4AF37]/30 p-8 md:p-20 rounded-2xl relative bg-[#132C2C]/90 backdrop-blur-md shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#D4AF37]/60 rounded-tl-xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#D4AF37]/60 rounded-br-xl" />
        
        {!submitted ? (
          <>
            <div className="text-center mb-16">
              <Heart className="mx-auto text-rose-300 fill-rose-300/10 mb-4 animate-pulse" size={32} strokeWidth={1.2} />
              <h2 className="text-4xl md:text-5xl font-extralight mb-4 tracking-wide font-serif">RSVP</h2>
              <p className="text-[#D4AF37] tracking-[0.2em] uppercase text-[10px] font-semibold">Kindly respond by March 31, 2027</p>
            </div>

            <form className="space-y-10" onSubmit={onSubmit}>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="border-b border-white/15 pb-2 focus-within:border-[#D4AF37] transition-colors duration-300">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37] block mb-2">Your Name</label>
                  <input name="guestName" required type="text" className="w-full bg-transparent outline-none py-1 placeholder:text-white/30 font-light text-base" placeholder="Full Name" />
                </div>

                <div className="pb-2 md:col-span-1">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37] block mb-3">Are you joining...</label>
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="side" value="Groom" required className="hidden peer" />
                      <div className="text-center py-2.5 border border-white/10 rounded-xl peer-checked:border-[#D4AF37] peer-checked:bg-[#D4AF37]/10 transition-all duration-300 hover:bg-white/5">
                        <span className="text-xs uppercase tracking-widest text-white/50 peer-checked:text-[#D4AF37] font-medium">Amir</span>
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="side" value="Bride" required className="hidden peer" defaultChecked />
                      <div className="text-center py-2.5 border border-white/10 rounded-xl peer-checked:border-[#D4AF37] peer-checked:bg-[#D4AF37]/10 transition-all duration-300 hover:bg-white/5">
                        <span className="text-xs uppercase tracking-widest text-white/50 peer-checked:text-[#D4AF37] font-medium">Mehrati</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="border-b border-white/15 pb-2 md:col-span-2 focus-within:border-[#D4AF37] transition-colors duration-300">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37] block mb-2">Total Guests</label>
                  <select 
                    name="status"
                    className="w-full bg-transparent outline-none py-1 text-white/80 cursor-pointer font-light text-base"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="bg-[#1A3A3A] text-white">{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <AnimatePresence>
                {guestCount > 1 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 overflow-hidden">
                    <p className="text-[#D4AF37] text-[10px] uppercase font-semibold tracking-widest mb-2 border-l-2 border-[#D4AF37] pl-2.5">Guest Names</p>
                    {Array.from({ length: guestCount - 1 }).map((_, index) => (
                      <motion.div key={index} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="border-b border-white/10 pb-2 focus-within:border-[#D4AF37]/60 transition-colors duration-300">
                        <input name={`extraName_${index + 1}`} required type="text" className="w-full bg-transparent outline-none py-1 text-sm placeholder:text-white/20 font-light" placeholder={`Plus One Name #${index + 1}`} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-b border-white/15 pb-2 focus-within:border-[#D4AF37] transition-colors duration-300">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37] block mb-2">Dietary Notes</label>
                <textarea name="dietary" className="w-full bg-transparent outline-none py-1 placeholder:text-white/30 h-16 font-light resize-none text-sm tracking-wide" placeholder="Any special requests or details..."></textarea>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-[#D4AF37] text-[#1A3A3A] hover:bg-white hover:text-[#1A3A3A] font-semibold py-4.5 transition-all duration-500 tracking-[0.3em] uppercase text-[11px] disabled:opacity-50 rounded-xl shadow-lg">
                {loading ? "Sending..." : "Confirm Attendance"}
              </button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="text-[#D4AF37]" size={32} />
            </div>
            <h2 className="text-3xl font-light mb-4 text-white tracking-widest font-serif italic">Shukran</h2>
            <p className="text-[#D4AF37] font-light tracking-wide text-sm">We have beautifully received your RSVP. See you soon!</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}