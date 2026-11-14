"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface RoyalEntranceProps {
  view: "invite" | "admin";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date(2027, 1, 6, 0, 0, 0);

function getTimeLeft(): TimeLeft {
  const difference = TARGET_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),

    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),

    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function RoyalEntrance({
  view,
}: RoyalEntranceProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    getTimeLeft()
  );

  useEffect(() => {
    // Update immediately
    setTimeLeft(getTimeLeft());

    // Update every second
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  if (view !== "invite") return null;

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#F7F1E7]">
      <div className="relative w-full">

        {/* =====================================================
            FULL INVITATION DESIGN
        ====================================================== */}

        <Image
          src="/isa.png"
          alt="Amir and Méhrati wedding invitation"
          width={854}
          height={2048}
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />

        {/* =====================================================
            LIVE COUNTDOWN

            Positioned inside the cream rectangle
            directly beside the cinema film strip.
        ====================================================== */}

        <div
          className="
            absolute
            left-[5.2%]
            top-[84%]
            z-20

            h-[13.2%]
            w-[55.8%]

            flex
            flex-col
            items-center
            justify-center

            overflow-hidden
          "
        >
          {/* ===================================================
              COUNTDOWN BACKGROUND

              This covers the old/static countdown printed
              inside the image.
          ==================================================== */}

          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#F4EEE4",
              backgroundImage:
                "radial-gradient(rgba(110,100,85,0.14) 0.45px, transparent 0.45px)",
              backgroundSize: "6px 6px",
            }}
          />

          {/* ===================================================
              COUNTDOWN CONTENT
          ==================================================== */}

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">

            {/* =================================================
                TITLE
            ================================================== */}

            <div
              className="
                whitespace-nowrap
                text-center
                text-[clamp(4.5vw,4vw,38vw)]
                font-normal
                leading-none
                tracking-[0.02em]
                text-black
              "
            >
              UNTIL THE BIG DAY
            </div>

            {/* =================================================
                NUMBERS
            ================================================== */}

            <div
              className="
                mt-[2.2%]
                flex
                w-[94%]
                items-start
                justify-center
                whitespace-nowrap
              "
            >
              <CountdownItem
                value={String(timeLeft.days)}
                label="DAYS"
              />

              <CountdownColon />

              <CountdownItem
                value={pad(timeLeft.hours)}
                label="HOURS"
              />

              <CountdownColon />

              <CountdownItem
                value={pad(timeLeft.minutes)}
                label="MINS"
              />

              <CountdownColon />

              <CountdownItem
                value={pad(timeLeft.seconds)}
                label="SECS"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ===============================================================
   COUNTDOWN NUMBER + LABEL
================================================================ */

function CountdownItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center">
      {/* Number */}
      <span
        className="
          whitespace-nowrap
          text-[clamp(12px,5.8vw,54px)]
          font-normal
          leading-none
          tracking-[-0.02em]
          text-black
        "
      >
        {value}
      </span>

      {/* Label */}
      <span
        className="
          mt-[5px]
          whitespace-nowrap
          text-[clamp(6px,1.6vw,14px)]
          font-normal
          leading-none
          tracking-[0.02em]
          text-[#444]
        "
      >
        {label}
      </span>
    </div>
  );
}

/* ===============================================================
   COLON BETWEEN COUNTDOWN VALUES
================================================================ */

function CountdownColon() {
  return (
    <span
      className="
        mx-[1.5%]
        mt-[1px]
        whitespace-nowrap
        text-[clamp(18px,4.6vw,44px)]
        font-normal
        leading-none
        text-black
      "
    >
      :
    </span>
  );
}