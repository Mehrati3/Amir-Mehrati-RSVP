"use client";

import React from "react";
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

interface RsvpSectionProps {
  submitted: boolean;
  guestCount: number;
  loading: boolean;
  setGuestCount: (count: number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

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

export default function RsvpSection({
  submitted,
  guestCount,
  loading,
  setGuestCount,
  onSubmit,
}: RsvpSectionProps) {
  /*
   * Explicitly type the animation object so TypeScript doesn't
   * infer ease values such as "easeOut" as a generic string.
   */
  const fadeIn = {
    initial: {
      opacity: 0,
      y: 30,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.15,
    },
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden px-4 py-20 text-[#403B3A] sm:px-6 md:py-28 lg:px-8"
      style={{
        backgroundColor: COLORS.cream,
      }}
    >
      {/* =====================================================
          PAPER TEXTURE
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(120,104,135,0.35) 0.55px, transparent 0.55px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* =====================================================
          LARGE BACKGROUND GLOWS
      ====================================================== */}

      <motion.div
        className="pointer-events-none absolute -left-44 top-10 h-[28rem] w-[28rem] rounded-full blur-[110px]"
        style={{
          backgroundColor: "#B7A7C7",
          opacity: 0.18,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.15, 0.23, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      />

      <motion.div
        className="pointer-events-none absolute -right-44 bottom-0 h-[30rem] w-[30rem] rounded-full blur-[110px]"
        style={{
          backgroundColor: "#C5B7D0",
          opacity: 0.2,
        }}
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.15, 0.24, 0.15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          backgroundColor: COLORS.olive,
          opacity: 0.055,
        }}
      />

      {/* =====================================================
          FLOATING DECORATIONS
      ====================================================== */}

      <FloatingDecoration
        className="left-[5%] top-[13%]"
        color={COLORS.lavenderLight}
        duration={5}
      >
        <Sparkles size={25} strokeWidth={0.9} />
      </FloatingDecoration>

      <FloatingDecoration
        className="right-[6%] top-[17%]"
        color={COLORS.olive}
        duration={6}
        rotate
      >
        <Flower2 size={34} strokeWidth={0.7} />
      </FloatingDecoration>

      <FloatingDecoration
        className="bottom-[15%] left-[7%]"
        color={COLORS.lavender}
        duration={5.5}
      >
        <Heart size={25} strokeWidth={0.8} />
      </FloatingDecoration>

      <FloatingDecoration
        className="bottom-[12%] right-[7%]"
        color={COLORS.olive}
        duration={6.5}
        rotate
      >
        <Stars size={30} strokeWidth={0.7} />
      </FloatingDecoration>

      {/* Tiny decorative stars */}

      <span
        className="pointer-events-none absolute left-[18%] top-[29%] text-sm opacity-40"
        style={{ color: COLORS.lavender }}
      >
        ✦
      </span>

      <span
        className="pointer-events-none absolute bottom-[28%] right-[18%] text-xs opacity-40"
        style={{ color: COLORS.olive }}
      >
        ✦
      </span>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <motion.div
        {...fadeIn}
        className="relative mx-auto max-w-3xl"
      >
        {/* ===================================================
            LAYERED SHADOW / CARD
        ==================================================== */}

        <div
          className="absolute inset-x-3 bottom-[-10px] top-3 border opacity-50"
          style={{
            borderColor: COLORS.lavenderLight,
            backgroundColor: COLORS.lavenderPale,
          }}
        />

        <div
          className="absolute inset-x-6 bottom-[-16px] top-6 opacity-40"
          style={{
            backgroundColor: COLORS.olivePale,
          }}
        />

        {/* ===================================================
            MAIN CARD
        ==================================================== */}

        <div
          className="relative overflow-hidden border shadow-[0_30px_90px_rgba(93,76,104,0.16)]"
          style={{
            backgroundColor: "rgba(252,248,241,0.97)",
            borderColor: `${COLORS.lavenderLight}80`,
          }}
        >
          {/* =================================================
              DECORATIVE CORNERS
          ================================================== */}

          <Corner
            position="left-top"
            color={COLORS.lavender}
            size="large"
          />

          <Corner
            position="right-bottom"
            color={COLORS.lavender}
            size="large"
          />

          <Corner
            position="right-top"
            color={COLORS.olive}
            size="small"
          />

          <Corner
            position="left-bottom"
            color={COLORS.olive}
            size="small"
          />

          {/* =================================================
              TOP DECORATIVE STRIP
          ================================================== */}

          <div className="px-5 pt-8 sm:px-8 sm:pt-10">
            <div
              className="flex items-center justify-center gap-4 border-y py-3"
              style={{
                borderColor: `${COLORS.lavenderLight}45`,
              }}
            >
              <span
                className="text-[9px] tracking-[0.3em]"
                style={{ color: COLORS.olive }}
              >
                ✦
              </span>

              <span
                className="text-[8px] font-semibold uppercase tracking-[0.4em]"
                style={{ color: COLORS.muted }}
              >
                A little note from the happy couple
              </span>

              <span
                className="text-[9px] tracking-[0.3em]"
                style={{ color: COLORS.lavender }}
              >
                ♡
              </span>
            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================== */}

          <div className="px-6 py-10 sm:px-12 sm:py-14 lg:px-20 lg:py-16">
            {!submitted ? (
              <>
                {/* ===========================================
                    HEADER
                ============================================ */}

                <div className="relative mb-12 text-center sm:mb-14">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut" as const,
                    }}
                    className="mb-5 flex items-center justify-center gap-4"
                  >
                    <span
                      className="text-lg"
                      style={{ color: COLORS.lavender }}
                    >
                      ✦
                    </span>

                    <motion.div
                      animate={{
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut" as const,
                      }}
                    >
                      <Heart
                        size={34}
                        strokeWidth={0.9}
                        style={{ color: COLORS.lavender }}
                        fill="rgba(169,154,187,0.16)"
                      />
                    </motion.div>

                    <span
                      className="text-lg"
                      style={{ color: COLORS.olive }}
                    >
                      ✦
                    </span>
                  </motion.div>

                  <p
                    className="mb-3 text-[9px] font-semibold uppercase tracking-[0.42em]"
                    style={{ color: COLORS.lavenderDark }}
                  >
                    We would love to celebrate with you
                  </p>

                  <h2
                    className="font-serif text-5xl font-light tracking-[0.1em] sm:text-6xl"
                    style={{ color: COLORS.text }}
                  >
                    RSVP
                  </h2>

                  <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                    <div
                      className="h-px w-12"
                      style={{
                        backgroundColor: `${COLORS.lavender}70`,
                      }}
                    />

                    <span
                      className="text-sm"
                      style={{ color: COLORS.lavender }}
                    >
                      ♡
                    </span>

                    <div
                      className="h-px w-12"
                      style={{
                        backgroundColor: `${COLORS.lavender}70`,
                      }}
                    />
                  </div>

                  <p
                    className="mt-6 text-[9px] font-semibold uppercase tracking-[0.27em]"
                    style={{ color: COLORS.olive }}
                  >
                    Kindly respond by January 16, 2027
                  </p>
                </div>

                {/* ===========================================
                    FORM
                ============================================ */}

                <form
                  onSubmit={onSubmit}
                  className="space-y-9"
                >
                  {/* Hidden guest count field.
                      Keeps compatibility with parent code that
                      reads formData.get("status"). */}
                  <input
                    type="hidden"
                    name="status"
                    value={guestCount}
                  />

                  {/* =========================================
                      NAME
                  ========================================== */}

                  <ElegantField
                    label="Your Name"
                    hint="Please enter your full name"
                  >
                    <input
                      name="guestName"
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      className="rsvp-input"
                    />
                  </ElegantField>

                  {/* =========================================
                      SIDE
                  ========================================== */}

                  <div>
                    <FieldLabel>
                      Are you joining...
                    </FieldLabel>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <SideCard
                        value="Groom"
                        name="side"
                        title="Amir"
                        subtitle="The Groom"
                        color={COLORS.olive}
                        icon="✦"
                        defaultChecked
                      />

                      <SideCard
                        value="Bride"
                        name="side"
                        title="Méhrati"
                        subtitle="The Bride"
                        color={COLORS.lavender}
                        icon="♡"
                      />
                    </div>
                  </div>

                  {/* =========================================
                      GUEST COUNT
                  ========================================== */}

                  <div>
                    <FieldLabel>
                      How many are coming?
                    </FieldLabel>

                    <div
                      className="flex items-center justify-between border px-4 py-4 sm:px-5"
                      style={{
                        borderColor: COLORS.border,
                        backgroundColor:
                          "rgba(245,240,247,0.48)",
                      }}
                    >
                      <div>
                        <p
                          className="font-serif text-lg"
                          style={{ color: COLORS.text }}
                        >
                          Total guests
                        </p>

                        <p
                          className="mt-1 text-[10px]"
                          style={{ color: COLORS.muted }}
                        >
                          Including yourself
                        </p>
                      </div>

                      <GuestCounter
                        guestCount={guestCount}
                        setGuestCount={setGuestCount}
                      />
                    </div>
                  </div>

                  {/* =========================================
                      EXTRA GUESTS
                  ========================================== */}

                  <AnimatePresence initial={false}>
                    {guestCount > 1 && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut" as const,
                        }}
                        className="overflow-hidden"
                      >
                        <div
                          className="border-l-2 pl-4 sm:pl-5"
                          style={{
                            borderColor:
                              COLORS.lavenderLight,
                          }}
                        >
                          <div className="mb-5">
                            <div className="flex items-center gap-2">
                              <span
                                style={{
                                  color: COLORS.lavender,
                                }}
                              >
                                ♡
                              </span>

                              <p
                                className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                                style={{
                                  color:
                                    COLORS.lavenderDark,
                                }}
                              >
                                Tell us who is coming
                              </p>
                            </div>

                            <p
                              className="mt-1 text-[10px]"
                              style={{
                                color: COLORS.muted,
                              }}
                            >
                              Please add the name of each
                              additional guest.
                            </p>
                          </div>

                          <div className="space-y-5">
                            {Array.from({
                              length: guestCount - 1,
                            }).map((_, index) => (
                              <motion.div
                                key={index}
                                initial={{
                                  opacity: 0,
                                  x: -15,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  duration: 0.35,
                                  delay: index * 0.06,
                                  ease: "easeOut" as const,
                                }}
                              >
                                <ElegantField
                                  label={`Guest #${index + 2}`}
                                  compact
                                >
                                  <input
                                    name={`extraName_${
                                      index + 1
                                    }`}
                                    required
                                    type="text"
                                    placeholder="Full name"
                                    className="rsvp-input"
                                  />
                                </ElegantField>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* =========================================
                      DIETARY NOTES
                  ========================================== */}


                  {/* =========================================
                      LITTLE MESSAGE
                  ========================================== */}

                  <div
                    className="border px-5 py-4 text-center"
                    style={{
                      backgroundColor: COLORS.olivePale,
                      borderColor: `${COLORS.olive}30`,
                    }}
                  >
                    <p
                      className="font-serif text-sm italic leading-6"
                      style={{ color: COLORS.text }}
                    >
                      “We can't wait to celebrate this
                      beautiful day with you.”
                    </p>
                  </div>

                  {/* =========================================
                      SUBMIT
                  ========================================== */}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{
                      y: -3,
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="group relative w-full overflow-hidden py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white shadow-[0_12px_30px_rgba(145,127,160,0.22)] transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      backgroundColor: COLORS.lavender,
                    }}
                  >
                    {/* Shine */}
                    <motion.span
                      className="absolute inset-y-0 -left-24 w-20 skew-x-[-20deg] bg-white/20"
                      animate={{
                        left: ["-20%", "120%"],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut" as const,
                      }}
                    />

                    <span className="relative flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <motion.span
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear" as const,
                            }}
                          >
                            ✦
                          </motion.span>

                          Sending your RSVP...
                        </>
                      ) : (
                        <>
                          Confirm Attendance

                          <Heart
                            size={14}
                            strokeWidth={1.5}
                          />
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Footer */}

                  <div className="flex items-center justify-center gap-3 pt-1">
                    <span
                      className="text-[8px]"
                      style={{
                        color: COLORS.lavender,
                      }}
                    >
                      ✦
                    </span>

                    <span
                      className="text-[8px] uppercase tracking-[0.3em]"
                      style={{
                        color: COLORS.lightText,
                      }}
                    >
                      With love, Amir & Méhrati
                    </span>

                    <span
                      className="text-[8px]"
                      style={{
                        color: COLORS.olive,
                      }}
                    >
                      ✦
                    </span>
                  </div>
                </form>
              </>
            ) : (
              <SuccessState />
            )}
          </div>

          {/* =================================================
              BOTTOM DECORATIVE STRIP
          ================================================== */}
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   FLOATING DECORATION
================================================================ */

function FloatingDecoration({
  children,
  className,
  color,
  duration,
  rotate = false,
}: {
  children: React.ReactNode;
  className: string;
  color: string;
  duration: number;
  rotate?: boolean;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      style={{ color, opacity: 0.48 }}
      animate={{
        y: [0, -12, 0],
        rotate: rotate ? [0, 7, 0] : [0, 3, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut" as const,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================
   CORNER
================================================================ */

function Corner({
  position,
  color,
  size,
}: {
  position:
    | "left-top"
    | "right-top"
    | "left-bottom"
    | "right-bottom";
  color: string;
  size: "large" | "small";
}) {
  const large = size === "large";

  const positionClass =
    position === "left-top"
      ? "left-0 top-0 border-l border-t"
      : position === "right-top"
      ? "right-0 top-0 border-r border-t"
      : position === "left-bottom"
      ? "bottom-0 left-0 border-b border-l"
      : "bottom-0 right-0 border-b border-r";

  return (
    <div
      className={`pointer-events-none absolute ${positionClass}`}
      style={{
        width: large ? 76 : 42,
        height: large ? 76 : 42,
        borderColor: `${color}${large ? "B0" : "70"}`,
      }}
    />
  );
}

/* ================================================================
   FIELD LABEL
================================================================ */

function FieldLabel({
  children,
  optional = false,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <label
        className="text-[9px] font-semibold uppercase tracking-[0.22em]"
        style={{
          color: COLORS.lavenderDark,
        }}
      >
        {children}
      </label>

      {optional && (
        <span
          className="text-[8px] uppercase tracking-[0.12em]"
          style={{
            color: COLORS.lightText,
          }}
        >
          Optional
        </span>
      )}
    </div>
  );
}

/* ================================================================
   ELEGANT FIELD
================================================================ */

function ElegantField({
  label,
  hint,
  compact = false,
  children,
}: {
  label: string;
  hint?: string;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className={`flex ${
          compact
            ? "mb-1.5 items-center justify-between"
            : "mb-2 items-end justify-between"
        }`}
      >
        <label
          className="text-[9px] font-semibold uppercase tracking-[0.22em]"
          style={{
            color: COLORS.lavenderDark,
          }}
        >
          {label}
        </label>

        {hint && (
          <span
            className="hidden text-[8px] sm:block"
            style={{
              color: COLORS.lightText,
            }}
          >
            {hint}
          </span>
        )}
      </div>

      <div
        className="border-b transition-colors duration-300 focus-within:border-[#9A8EAA]"
        style={{
          borderColor: `${COLORS.lavenderLight}55`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ================================================================
   SIDE CARD
================================================================ */

function SideCard({
  value,
  name,
  title,
  subtitle,
  color,
  icon,
  defaultChecked = false,
}: {
  value: string;
  name: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="group block cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        required
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />

      <div
        className="relative overflow-hidden border px-5 py-4 transition-all duration-300 hover:-translate-y-1 peer-checked:-translate-y-1"
        style={{
          borderColor: `${color}40`,
          backgroundColor: `${color}09`,
          boxShadow: "none",
        }}
      >
        {/* Selected indicator */}

        <div
          className="absolute right-3 top-3 flex h-5 w-5 scale-0 items-center justify-center rounded-full text-white opacity-0 transition-all duration-300 peer-checked:scale-100 peer-checked:opacity-100"
          style={{
            backgroundColor: color,
          }}
        >
          <Check size={11} strokeWidth={2.5} />
        </div>

        {/* Decorative icon */}

        <span
          className="absolute bottom-1 right-3 text-3xl opacity-[0.07]"
          style={{
            color,
          }}
        >
          {icon}
        </span>

        <div className="relative">
          <p
            className="mb-1 font-serif text-xl"
            style={{
              color: COLORS.text,
            }}
          >
            {title}
          </p>

          <p
            className="text-[8px] font-semibold uppercase tracking-[0.2em]"
            style={{
              color,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </label>
  );
}

/* ================================================================
   GUEST COUNTER
================================================================ */

function GuestCounter({
  guestCount,
  setGuestCount,
}: {
  guestCount: number;
  setGuestCount: (count: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        type="button"
        whileTap={{ scale: 0.88 }}
        disabled={guestCount <= 1}
        onClick={() =>
          setGuestCount(Math.max(1, guestCount - 1))
        }
        className="flex h-9 w-9 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-30"
        style={{
          borderColor: `${COLORS.lavenderLight}65`,
          color: COLORS.lavenderDark,
          backgroundColor: COLORS.paperLight,
        }}
        aria-label="Decrease guest count"
      >
        <Minus size={14} />
      </motion.button>

      <motion.div
        key={guestCount}
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut" as const,
        }}
        className="flex h-11 w-11 items-center justify-center rounded-full font-serif text-xl"
        style={{
          backgroundColor: COLORS.lavenderPale,
          color: COLORS.lavenderDark,
        }}
      >
        {guestCount}
      </motion.div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.88 }}
        disabled={guestCount >= 5}
        onClick={() =>
          setGuestCount(Math.min(5, guestCount + 1))
        }
        className="flex h-9 w-9 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-30"
        style={{
          borderColor: `${COLORS.lavenderLight}65`,
          color: COLORS.lavenderDark,
          backgroundColor: COLORS.paperLight,
        }}
        aria-label="Increase guest count"
      >
        <Plus size={14} />
      </motion.button>
    </div>
  );
}

/* ================================================================
   SUCCESS STATE
================================================================ */

function SuccessState() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.94,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut" as const,
      }}
      className="flex min-h-[500px] flex-col items-center justify-center py-10 text-center"
    >
      {/* Floating sparkles */}

      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
        className="mb-3 text-lg"
        style={{
          color: COLORS.lavender,
        }}
      >
        ✦
      </motion.div>

      {/* Heart */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
        className="relative mb-7 flex h-24 w-24 items-center justify-center rounded-full border"
        style={{
          borderColor: `${COLORS.lavender}65`,
          backgroundColor: COLORS.lavenderPale,
          boxShadow:
            "0 15px 45px rgba(154,142,170,0.18)",
        }}
      >
        <div
          className="absolute inset-2 rounded-full border"
          style={{
            borderColor: `${COLORS.lavender}25`,
          }}
        />

        <Heart
          size={38}
          strokeWidth={0.9}
          style={{
            color: COLORS.lavender,
          }}
          fill="rgba(154,142,170,0.2)"
        />
      </motion.div>

      <p
        className="mb-3 text-[9px] font-semibold uppercase tracking-[0.38em]"
        style={{
          color: COLORS.olive,
        }}
      >
        Your RSVP has been received
      </p>

      <h2
        className="font-serif text-5xl font-light italic tracking-[0.1em] sm:text-6xl"
        style={{
          color: COLORS.text,
        }}
      >
        Shukran
      </h2>

      <div className="my-6 flex items-center gap-3">
        <div
          className="h-px w-14"
          style={{
            backgroundColor: `${COLORS.lavender}65`,
          }}
        />

        <Sparkles
          size={15}
          strokeWidth={1}
          style={{
            color: COLORS.lavender,
          }}
        />

        <div
          className="h-px w-14"
          style={{
            backgroundColor: `${COLORS.lavender}65`,
          }}
        />
      </div>

      <p
        className="max-w-md text-sm font-light leading-7 tracking-wide"
        style={{
          color: COLORS.muted,
        }}
      >
        We are so happy to have you with us.
        <br />
        We cannot wait to celebrate this beautiful
        day together.
      </p>

      {/* Date-style decorative card */}

      <div
        className="mt-8 border px-7 py-4"
        style={{
          borderColor: `${COLORS.olive}35`,
          backgroundColor: COLORS.olivePale,
        }}
      >
        <p
          className="text-[8px] font-semibold uppercase tracking-[0.3em]"
          style={{
            color: COLORS.olive,
          }}
        >
          See you on the big day
        </p>

        <p
          className="mt-1 font-serif text-lg"
          style={{
            color: COLORS.text,
          }}
        >
          February 6, 2027
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <motion.span
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
          style={{
            color: COLORS.lavender,
          }}
        >
          ✦
        </motion.span>

        <span
          className="text-lg"
          style={{
            color: COLORS.lavender,
          }}
        >
          ♡
        </span>

        <motion.span
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut" as const,
          }}
          style={{
            color: COLORS.olive,
          }}
        >
          ✦
        </motion.span>
      </div>
    </motion.div>
  );
}