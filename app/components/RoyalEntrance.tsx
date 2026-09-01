"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface RoyalEntranceProps {
  view: "invite" | "admin";
}

// Envelope geometry (envelope box is 420px tall on desktop).
const ENVELOPE_H = 420;
const CARD_REST_Y = 235;
const CARD_FINAL_Y = -55;
const STAGE_TOP_OFFSET = 90;
const FLAP_OPEN_ANGLE = 0; // tucked-back resting angle, not a full 180 flip

export default function RoyalEntrance({ view }: RoyalEntranceProps) {
  const [opened, setOpened] = useState(false);
  const [finished, setFinished] = useState(false);

  if (view !== "invite") return null;

  const handleOpen = () => {
    if (opened) return;

    setOpened(true);

    // flap springs open (~0.85s to settle) -> card rises (0.85s delay + 3.2s)
    setTimeout(() => {
      setFinished(true);
    }, 4400);
  };

  return (
    <>
      <AnimatePresence>
        {!finished && (
          <motion.section
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#F4EFE5]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,145,75,0.10),transparent_60%)]" />

            <div
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  "radial-gradient(#76664a 0.5px, transparent 0.5px)",
                backgroundSize: "7px 7px",
              }}
            />

            <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A88A4A]/10" />

            <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A88A4A]/10" />

            {/* =====================================================
                ENVELOPE
            ===================================================== */}

            <motion.div
              className="relative h-[420px] w-[620px] max-w-[90vw] max-h-[70vh]"
              style={{
                perspective: 1800,
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Envelope shadow */}
              <motion.div
                className="absolute left-1/2 top-[88%] h-10 w-[75%] -translate-x-1/2 rounded-full bg-black/15 blur-2xl"
                animate={
                  opened
                    ? {
                        opacity: 0.06,
                        scaleX: 1.15,
                      }
                    : {
                        opacity: 0.18,
                        scaleX: 1,
                      }
                }
                transition={
                  opened
                    ? {
                        duration: 3.2,
                        delay: 0.85,
                        ease: "easeOut",
                      }
                    : { duration: 1.5 }
                }
              />

              {/* ===================================================
                  CLIPPED STAGE
              =================================================== */}
              <div
                className="absolute inset-x-0 bottom-0 overflow-hidden"
                style={{ top: opened ? -STAGE_TOP_OFFSET : 0 }}
              >
                {/* ENVELOPE BACK */}
                <div
                  className="absolute inset-x-0 bottom-0 z-[10] overflow-hidden rounded-[5px] shadow-[0_30px_90px_rgba(0,0,0,0.20)]"
                  style={{
                    height: ENVELOPE_H,
                    background:
                      "linear-gradient(135deg,#EEE6D5 0%,#E4D9C4 48%,#D2C2A5 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.22]"
                    style={{
                      backgroundImage:
                        "radial-gradient(#786848 0.55px, transparent 0.55px)",
                      backgroundSize: "8px 8px",
                    }}
                  />

                  {/* Left fold */}
                  <div
                    className="absolute inset-y-0 left-0 w-1/2"
                    style={{
                      clipPath: "polygon(0 0,100% 50%,0 100%)",
                      background:
                        "linear-gradient(135deg,#F4EFE4,#D8CCB5)",
                    }}
                  />

                  {/* Right fold */}
                  <div
                    className="absolute inset-y-0 right-0 w-1/2"
                    style={{
                      clipPath: "polygon(100% 0,0 50%,100% 100%)",
                      background:
                        "linear-gradient(225deg,#F1EBDD,#D3C5AA)",
                    }}
                  />

                  {/* Bottom fold */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[56%]"
                    style={{
                      clipPath: "polygon(0 100%,50% 0,100% 100%)",
                      background:
                        "linear-gradient(180deg,#E4D9C4,#CDBFA5)",
                    }}
                  />

                  <div className="absolute inset-0 shadow-[inset_0_0_35px_rgba(85,65,35,0.12)]" />
                </div>

                {/* =========================================================
                    INVITATION
                ========================================================= */}
                <motion.div
                  className="absolute left-1/2 top-[16%] h-[32vh] max-h-[300px] w-auto -translate-x-1/2 aspect-[0.707]"
                  style={{
                    zIndex: 20,
                    transformStyle: "preserve-3d",
                  }}
                  initial={{
                    y: CARD_REST_Y,
                    scale: 0.94,
                    rotateX: 14,
                  }}
                  animate={
                    opened
                      ? {
                          y: [CARD_REST_Y, CARD_FINAL_Y],
                          scale: [0.94, 1],
                          rotateX: [14, 0],
                        }
                      : {
                          y: CARD_REST_Y,
                          scale: 0.94,
                          rotateX: 14,
                        }
                  }
                  transition={
                    opened
                      ? {
                          duration: 3.2,
                          delay: 0.85,
                          ease: [0.22, 1, 0.36, 1],
                        }
                      : {
                          duration: 0,
                        }
                  }
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                    <Image
                      src="/invitation.png"
                      alt="Amir and Méhrati wedding invitation"
                      fill
                      priority
                      className="object-cover"
                      sizes="390px"
                    />
                  </div>
                </motion.div>

                {/* ===================================================
                    FRONT POCKET
                =================================================== */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-[5px]"
                  style={{
                    height: ENVELOPE_H * 0.58,
                    zIndex: 30,
                    clipPath: "polygon(0 0,50% 45%,100% 0,100% 100%,0 100%)",
                    background:
                      "linear-gradient(145deg,#EEE6D7,#DDD1B9 55%,#CDBD9E)",
                  }}
                  initial={{ y: 0 }}
                  animate={opened ? { y: 135 } : { y: 0 }}
                  transition={
                    opened
                      ? {
                          duration: 3.2,
                          delay: 0.85,
                          ease: [0.22, 1, 0.36, 1],
                        }
                      : { duration: 0 }
                  }
                >
                  <div
                    className="absolute inset-0 opacity-[0.18]"
                    style={{
                      backgroundImage:
                        "radial-gradient(#756648 0.5px, transparent 0.5px)",
                      backgroundSize: "7px 7px",
                    }}
                  />
                </motion.div>
              </div>

              {/* ===================================================
                  ENVELOPE FLAP

                  THE OVERLAP FIX: z-index used to be a fixed 40,
                  always above the card (20), no matter how far the
                  flap had rotated in fake-3D space — z-index is flat
                  2D paint order, it doesn't know or care about the
                  rotateX trick. So even a "fully opened" flap kept
                  drawing over the card wherever their boxes crossed.

                  Now z-index drops to 5 (below the card AND the
                  pocket) the instant `opened` becomes true — matching
                  reality: once the flap is lifted, the card you're
                  pulling out sits in FRONT of the folded-back flap,
                  not behind it.

                  THE REALISM CHANGE: a spring instead of a flat tween
                  (real card stock has a little overshoot/bounce when
                  it flops open), and it now rests at ~-112deg (tucked
                  back past vertical) instead of doing a full -180
                  flip back around to face forward again.
              =================================================== */}

              <motion.div
                className="absolute left-0 top-0 h-[58%] w-full origin-top"
                style={{
                  zIndex: opened ? 5 : 40,
                  perspective: 1800,
                  transformStyle: "preserve-3d",
                }}
                initial={{
                  rotateX: 0,
                }}
                animate={{
                  rotateX: opened ? FLAP_OPEN_ANGLE : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                  mass: 0.9,
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    clipPath: "polygon(0 0,100% 0,50% 100%)",
                    background:
                      "linear-gradient(135deg,#F6F0E3,#E2D7C2 60%,#CDBE9F)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-[0.20]"
                    style={{
                      backgroundImage:
                        "radial-gradient(#756648 0.5px, transparent 0.5px)",
                      backgroundSize: "7px 7px",
                    }}
                  />
                </div>

                {/* Back — locally rotated to +112deg so it lands
                    face-forward exactly when the parent settles at
                    -112deg (112 + -112 = 0). */}
                <div
                  className="absolute inset-0 bg-[#E4D9C5]"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: `rotateX(${-FLAP_OPEN_ANGLE}deg)`,
                    clipPath: "polygon(0 0,100% 0,50% 100%)",
                  }}
                />
              </motion.div>

              {/* ===================================================
                  LOGO SEAL
              =================================================== */}

              <motion.button
                type="button"
                onClick={handleOpen}
                disabled={opened}
                aria-label="Open wedding invitation"
                className="absolute left-1/2 top-[48%] z-[60] flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#866C2C] bg-[#B49345] shadow-[0_12px_30px_rgba(55,40,15,0.30)]"
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: opened ? 0.85 : 1,
                  opacity: opened ? 0 : 1,
                }}
                transition={{
                  scale: {
                    delay: 0.9,
                    duration: 0.7,
                    type: "spring",
                    stiffness: 170,
                  },
                  opacity: {
                    duration: 0.35,
                  },
                }}
                whileHover={
                  !opened
                    ? {
                        scale: 1.08,
                      }
                    : {}
                }
                whileTap={
                  !opened
                    ? {
                        scale: 0.94,
                      }
                    : {}
                }
              >
                <div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full border border-[#EBD9A1]/60 bg-[#C4A65B]">
                  <Image
                    src="/logoo.png"
                    alt="Amir & Méhrati"
                    width={68}
                    height={68}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              </motion.button>
            </motion.div>

            {/* Instruction */}
            <AnimatePresence>
              {!opened && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                  }}
                  transition={{
                    delay: 1.5,
                    duration: 0.8,
                  }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
                >
                  <p className="font-serif text-sm tracking-[0.25em] text-[#756648]">
                    OPEN OUR INVITATION
                  </p>

                  <div className="mx-auto mt-3 h-px w-16 bg-[#B49345]/50" />

                  <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-[#9A8C72]">
                    Click the seal
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ============================================================
          FINAL INVITATION
      ============================================================ */}

      {finished && (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FDFBF7] px-5 py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.07),transparent_60%)]" />

          <div className="relative w-full max-w-[520px]">
            <Image
              src="/invitation.png"
              alt="Amir & Méhrati Wedding Invitation"
              width={1000}
              height={1414}
              priority
              className="h-auto w-full rounded-sm shadow-[0_25px_80px_rgba(0,0,0,0.18)]"
            />
          </div>
        </section>
      )}
    </>
  );
}