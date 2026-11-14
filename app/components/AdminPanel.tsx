"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  Pencil,
  X,
  Check,
  Users,
  Heart,
  UserRound,
  Sparkles,
  ChevronDown,
  FileText,
  Music2,
  Loader2,
} from "lucide-react";

interface AdminPanelProps {
  isAuthenticated: boolean;
  password: React.ComponentState;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
 handleLogin: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;

  guests: any[];

  editingId: number | null;
  setEditingId: (id: number | null) => void;

  editFormData: any;
  setEditFormData: (data: any) => void;

  editError: string | null;
  setEditError: (err: string | null) => void;

  handleUpdateGuest: (id: number) => void;
  handleDeleteGuest: (id: number) => void;
  fetchGuests: () => void;
}

const lavender = "#9A8EAA";
const lavenderLight = "#A99ABB";
const lavenderSoft = "#EEE8F2";
const olive = "#7A8065";
const oliveLight = "#E8E9DE";
const cream = "#F6F0E7";
const paper = "#FBF8F2";
const charcoal = "#403C3A";
const muted = "#77716D";

export default function AdminPanel({
  isAuthenticated,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  guests,
  editingId,
  setEditingId,
  editFormData,
  setEditFormData,
  editError,
  setEditError,
  handleUpdateGuest,
  handleDeleteGuest,
  fetchGuests,
  
}: AdminPanelProps) {
  const [songRecommendations, setSongRecommendations] = useState<any[]>([]);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const [songError, setSongError] = useState("");

  
  const fetchSongRecommendations = useCallback(async () => {
    setLoadingSongs(true);
    setSongError("");

    try {
      const response = await fetch("/api/admin/songs", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to load recommendations"
        );
      }

      setSongRecommendations(result.recommendations || []);
    } catch (error) {
      console.error("Error fetching song recommendations:", error);

      setSongError(
        error instanceof Error
          ? error.message
          : "Unable to load song recommendations."
      );
    } finally {
      setLoadingSongs(false);
    }
  }, []);


  useEffect(() => {
    if (isAuthenticated) {
      fetchSongRecommendations();
    }
  }, [isAuthenticated, fetchSongRecommendations]);

  const handleDeleteSong = async (id: number) => {
    const song = songRecommendations.find(
      (item) => String(item.id) === String(id)
    );

    const confirmed = window.confirm(
      `Are you sure you want to remove "${song?.track_name || "this song"}" from the wedding playlist?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch("/api/admin/songs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to delete song.");
      }

      // Remove the deleted recommendation from the screen
      setSongRecommendations((current) =>
        current.filter(
          (item) => String(item.id) !== String(id)
        )
      );

    } catch (error) {
      console.error("Error deleting song:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to delete this song."
      );
    }
  };

  /*
   * ------------------------------------------------------------
   * Derived statistics
   * ------------------------------------------------------------
   */

  const stats = useMemo(() => {
    const attending = guests.filter(
      (guest) => guest.status === "Attending"
    );

    const groom = attending.filter(
      (guest) => guest.side === "Groom"
    );

    const bride = attending.filter(
      (guest) => guest.side === "Bride"
    );

    const totalGuests = attending.reduce(
      (sum, guest) => sum + Number(guest.total_guests ?? 1),
      0
    );

    const groomGuests = groom.reduce(
      (sum, guest) => sum + Number(guest.total_guests ?? 1),
      0
    );

    const brideGuests = bride.reduce(
      (sum, guest) => sum + Number(guest.total_guests ?? 1),
      0
    );

    const plusOnes = Math.max(totalGuests - attending.length, 0);

    return {
      totalGuests,
      groomGuests,
      brideGuests,
      plusOnes,
    };
  }, [guests]);

  const attendingGuests = guests.filter(
    (guest) => guest.status === "Attending"
  );

  const declinedGuests = guests.filter(
    (guest) => guest.status === "Not Attending"
  );

  const groomRsvps = attendingGuests.filter(
    (guest) => guest.side === "Groom"
  );

  const brideRsvps = attendingGuests.filter(
    (guest) => guest.side === "Bride"
  );

  /*
   * ------------------------------------------------------------
   * Edit helpers
   * ------------------------------------------------------------
   */

  
  const startEditing = (guest: any) => {
    setEditingId(guest.id);
    setEditError(null);

    setEditFormData({
      name: guest.name || "",
      total_guests:
        guest.status === "Not Attending"
          ? 0
          : guest.total_guests || 1,
      additional_guests: Array.isArray(guest.additional_guests)
        ? [...guest.additional_guests]
        : [],
      notes: guest.notes || "",
      side: guest.side || null,
    });
  };


  const cancelEditing = () => {
    setEditingId(null);
    setEditError(null);
  };

  const updateAdditionalGuest = (
    index: number,
    value: string
  ) => {
    const currentGuests = Array.isArray(
      editFormData.additional_guests
    )
      ? [...editFormData.additional_guests]
      : [];

    currentGuests[index] = value;

    setEditFormData({
      ...editFormData,
      additional_guests: currentGuests,
    });

    setEditError(null);
  };

  const handleGuestCountChange = (value: number) => {
    const currentGuests = Array.isArray(
      editFormData.additional_guests
    )
      ? [...editFormData.additional_guests]
      : [];

    const requiredAdditionalGuests = Math.max(value - 1, 0);

    while (currentGuests.length < requiredAdditionalGuests) {
      currentGuests.push("");
    }

    if (currentGuests.length > requiredAdditionalGuests) {
      currentGuests.splice(requiredAdditionalGuests);
    }

    setEditFormData({
      ...editFormData,
      total_guests: value,
      additional_guests: currentGuests,
    });

    setEditError(null);
  };

  
  const submitUpdate = (id: number) => {
    const guest = guests.find((item) => item.id === id);

    // Declined guests only need their name updated.
    if (guest?.status === "Not Attending") {
      if (!editFormData.name?.trim()) {
        setEditError("Please enter the guest's name.");
        return;
      }

      setEditError(null);
      handleUpdateGuest(id);
      return;
    }

    const additionalGuests = Array.isArray(
      editFormData.additional_guests
    )
      ? editFormData.additional_guests
      : [];

    const filledAdditionalGuests = additionalGuests.filter(
      (name: string) => name?.trim()
    );

    const expectedCount = 1 + filledAdditionalGuests.length;
    const selectedCount = Number(editFormData.total_guests || 1);

    if (expectedCount !== selectedCount) {
      setEditError(
        `Please enter ${Math.max(
          selectedCount - 1,
          0
        )} additional guest name${
          selectedCount - 1 === 1 ? "" : "s"
        }.`
      );
      return;
    }

    setEditError(null);
    handleUpdateGuest(id);
  };


  /*
   * ------------------------------------------------------------
   * Login screen
   * ------------------------------------------------------------
   */

  if (!isAuthenticated) {
    return (
      <main
        className="relative min-h-screen overflow-hidden px-5 py-10 sm:px-8"
        style={{
          backgroundColor: cream,
          color: charcoal,
        }}
      >
        {/* Paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(#9A8EAA22 0.8px, transparent 0.8px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* Decorative blobs */}
        <motion.div
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ backgroundColor: "#D9D0E0" }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: "#DDE0D0" }}
          animate={{
            scale: [1.05, 1, 1.05],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
            {/* Brand */}
            <div className="mb-7 text-center">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-4 text-3xl"
                style={{ color: lavender }}
              >
                ♡
              </motion.div>

              <p
                className="mb-2 text-[10px] font-medium uppercase tracking-[0.45em]"
                style={{ color: olive }}
              >
                ✦ Private Access ✦
              </p>

              <h1
                className="font-serif text-4xl sm:text-5xl"
                style={{ color: charcoal }}
              >
                Amir & Méhrati
              </h1>

              <p
                className="mt-3 font-serif text-lg italic"
                style={{ color: muted }}
              >
                Wedding Dashboard
              </p>
            </div>

            {/* Login card */}
            <div
              className="relative overflow-hidden rounded-[2rem] border p-7 shadow-[0_25px_70px_rgba(64,60,58,0.12)] sm:p-9"
              style={{
                backgroundColor: paper,
                borderColor: "#DDD5DD",
              }}
            >
              {/* Decorative corner */}
              <div
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full"
                style={{
                  backgroundColor: lavenderSoft,
                }}
              />

              <div className="relative">
                <div
                  className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border"
                  style={{
                    borderColor: "#D6CEDB",
                    backgroundColor: "#F2EDF4",
                    color: lavender,
                  }}
                >
                  <Lock size={21} strokeWidth={1.7} />
                </div>

                <div className="mb-7 text-center">
                  <h2
                    className="font-serif text-2xl"
                    style={{ color: charcoal }}
                  >
                    Welcome back
                  </h2>

                  <p
                    className="mt-2 text-sm leading-6"
                    style={{ color: muted }}
                  >
                    Enter the private password to view your
                    wedding RSVPs.
                  </p>
                </div>

                <form onSubmit={handleLogin}>
                  <label
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em]"
                    style={{ color: olive }}
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password as string}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter password"
                      className="w-full rounded-2xl border bg-white/60 px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-[#AAA39E] focus:ring-2"
                      style={{
                        borderColor: "#D8D0D8",
                        color: charcoal,
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 transition hover:bg-[#EEE8F2]"
                      style={{ color: lavender }}
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg"
                    style={{
                      backgroundColor: lavender,
                      boxShadow:
                        "0 12px 25px rgba(154,142,170,0.25)",
                    }}
                  >
                    <Lock size={15} />
                    Enter Dashboard
                  </motion.button>
                </form>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <span
                    className="h-px w-12"
                    style={{ backgroundColor: "#DED7DE" }}
                  />
                  <span style={{ color: lavender }}>♡</span>
                  <span
                    className="h-px w-12"
                    style={{ backgroundColor: "#DED7DE" }}
                  />
                </div>
              </div>
            </div>

            <p
              className="mt-6 text-center text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "#9A938E" }}
            >
              A little corner for the big day ✦
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  /*
   * ------------------------------------------------------------
   * Dashboard
   * ------------------------------------------------------------
   */

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-7 sm:px-6 lg:px-10"
      style={{
        backgroundColor: cream,
        color: charcoal,
      }}
    >
      {/* Background paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(#9A8EAA22 0.75px, transparent 0.75px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Decorative background shapes */}
      <motion.div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: "#E1DAE6" }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -left-32 top-[45%] h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: "#E3E5D9" }}
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ======================================================
            Header
        ====================================================== */}

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="text-xl"
                  style={{ color: lavender }}
                >
                  ✦
                </span>

                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.4em]"
                  style={{ color: olive }}
                >
                  Private Wedding Dashboard
                </p>

                <span
                  className="text-xl"
                  style={{ color: lavender }}
                >
                  ✦
                </span>
              </div>

              <h1
                className="font-serif text-4xl leading-none sm:text-5xl lg:text-6xl"
                style={{ color: charcoal }}
              >
                Amir{" "}
                <span style={{ color: lavender }}>
                  &amp;
                </span>{" "}
                Méhrati
              </h1>

              <p
                className="mt-3 font-serif text-base italic sm:text-lg"
                style={{ color: muted }}
              >
                Every RSVP brings us one little step closer
                to the big day ♡
              </p>
            </div>

            <motion.button
              type="button"
              onClick={() => {
                fetchGuests();
                fetchSongRecommendations();
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border bg-white/50 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm transition"
              style={{
                borderColor: "#D9D1D8",
                color: charcoal,
              }}
            >
              <RefreshCw size={14} />
              Refresh Data
            </motion.button>
          </div>

          {/* Decorative line */}
          <div className="mt-7 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "#DCD5DB" }}
            />
            <span
              className="text-sm"
              style={{ color: lavender }}
            >
              ♡
            </span>
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "#DCD5DB" }}
            />
          </div>
        </motion.header>

        {/* ======================================================
            Summary Cards
        ====================================================== */}

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            icon={<Users size={20} strokeWidth={1.7} />}
            label="Total Guests"
            value={stats.totalGuests}
            description={`${guests.length} RSVP${
              guests.length === 1 ? "" : "s"
            }`}
            accent={lavender}
            delay={0}
          />

          <StatCard
            icon={<Heart size={20} strokeWidth={1.7} />}
            label="Amir's Side"
            value={stats.groomGuests}
            description={`${groomRsvps.length} RSVP${
              groomRsvps.length === 1 ? "" : "s"
            }`}
            accent={olive}
            delay={0.08}
          />

          <StatCard
            icon={<Heart size={20} strokeWidth={1.7} />}
            label="Méhrati's Side"
            value={stats.brideGuests}
            description={`${brideRsvps.length} RSVP${
              brideRsvps.length === 1 ? "" : "s"
            }`}
            accent={lavenderLight}
            delay={0.16}
          />

          <StatCard
            icon={<UserRound size={20} strokeWidth={1.7} />}
            label="Plus Ones"
            value={stats.plusOnes}
            description="Additional guests"
            accent={olive}
            delay={0.24}
          />
          <StatCard
            icon={<Heart size={20} strokeWidth={1.7} />}
            label="Unable to Attend"
            value={declinedGuests.length}
            description="Declined RSVPs"
            accent={lavender}
            delay={0.32}
          />
        </section>

        {/* ======================================================
            Declined Guests
        ====================================================== */}

        

        {/* ======================================================
            Guest Lists
        ====================================================== */}

        <div className="space-y-8">
          <GuestSideSection
            title="Amir's Side"
            subtitle="Groom's family & friends"
            guests={groomRsvps}
            side="Groom"
            color={lavender}
            lightColor={lavenderSoft}
            editingId={editingId}
            editFormData={editFormData}
            editError={editError}
            onStartEditing={startEditing}
            onCancelEditing={cancelEditing}
            onDelete={handleDeleteGuest}
            onSubmitEdit={submitUpdate}
            onGuestCountChange={handleGuestCountChange}
            onAdditionalGuestChange={updateAdditionalGuest}
            setEditFormData={setEditFormData}
          />

          <GuestSideSection
            title="Méhrati's Side"
            subtitle="Bride's family & friends"
            guests={brideRsvps}
            side="Bride"
            color={olive}
            lightColor={oliveLight}
            editingId={editingId}
            editFormData={editFormData}
            editError={editError}
            onStartEditing={startEditing}
            onCancelEditing={cancelEditing}
            onDelete={handleDeleteGuest}
            onSubmitEdit={submitUpdate}
            onGuestCountChange={handleGuestCountChange}
            onAdditionalGuestChange={updateAdditionalGuest}
            setEditFormData={setEditFormData}
          />
        </div>
        <div className="mt-8">
        <DeclinedGuestsSection
          guests={declinedGuests}
          editingId={editingId}
          editFormData={editFormData}
          editError={editError}
          onStartEditing={startEditing}
          onCancelEditing={cancelEditing}
          onSubmitEdit={submitUpdate}
          onDelete={handleDeleteGuest}
          setEditFormData={setEditFormData}
        />
        <div className="mt-8">
          <SongRecommendationsSection
            recommendations={songRecommendations}
            loading={loadingSongs}
            error={songError}
            onDelete={handleDeleteSong}
          />
        </div>
        </div>
      

        {/* Footer */}
        <footer className="py-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span
              className="h-px w-16"
              style={{ backgroundColor: "#DCD5DB" }}
            />
            <span style={{ color: lavender }}>♡</span>
            <span
              className="h-px w-16"
              style={{ backgroundColor: "#DCD5DB" }}
            />
          </div>

          <p
            className="font-serif text-sm italic"
            style={{ color: muted }}
          >
            Counting down to forever ✦
          </p>
        </footer>
      </div>
    </main>
  );
}

/*
 * ================================================================
 * STAT CARD
 * ================================================================
 */

function StatCard({
  icon,
  label,
  value,
  description,
  accent,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-[1.6rem] border bg-white/65 p-5 shadow-[0_15px_40px_rgba(64,60,58,0.07)]"
      style={{ borderColor: "#DED7DE" }}
    >
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-40"
        style={{ backgroundColor: accent }}
      />

      <div className="relative">
        <div
          className="mb-5 flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: `${accent}22`,
            color: accent,
          }}
        >
          {icon}
        </div>

        <p
          className="text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: muted }}
        >
          {label}
        </p>

        <div className="mt-1 flex items-end gap-2">
          <span
            className="font-serif text-4xl"
            style={{ color: charcoal }}
          >
            {value}
          </span>

          <Sparkles
            size={13}
            className="mb-2"
            style={{ color: accent }}
          />
        </div>

        <p
          className="mt-1 text-xs"
          style={{ color: "#96908B" }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/*
 * ================================================================
 * GUEST SIDE SECTION
 * ================================================================
 */

function GuestSideSection({
  title,
  subtitle,
  guests,
  color,
  lightColor,
  editingId,
  editFormData,
  editError,
  onStartEditing,
  onCancelEditing,
  onDelete,
  onSubmitEdit,
  onGuestCountChange,
  onAdditionalGuestChange,
  setEditFormData,
}: {
  title: string;
  subtitle: string;
  guests: any[];
  side: "Groom" | "Bride";
  color: string;
  lightColor: string;
  editingId: number | null;
  editFormData: any;
  editError: string | null;
  onStartEditing: (guest: any) => void;
  onCancelEditing: () => void;
  onDelete: (id: number) => void;
  onSubmitEdit: (id: number) => void;
  onGuestCountChange: (value: number) => void;
  onAdditionalGuestChange: (
    index: number,
    value: string
  ) => void;
  setEditFormData: (data: any) => void;
}) {
  const totalGuests = guests
    .filter((guest) => guest.status === "Attending")
    .reduce(
      (sum, guest) => sum + Number(guest.total_guests || 1),
      0
    );

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-[2rem] border bg-white/60 shadow-[0_20px_60px_rgba(64,60,58,0.08)]"
      style={{ borderColor: "#DED7DE" }}
    >
      {/* Section header */}
      <div
        className="relative overflow-hidden px-5 py-5 sm:px-7"
        style={{
          backgroundColor: lightColor,
          borderColor: "#DED7DE",
        }}
      >
        <div
          className="absolute -right-10 -top-14 h-36 w-36 rounded-full opacity-50"
          style={{ backgroundColor: color }}
        />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white/60"
              style={{
                borderColor: `${color}55`,
                color,
              }}
            >
              <Heart size={20} fill="currentColor" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2
                  className="font-serif text-2xl sm:text-3xl"
                  style={{ color: charcoal }}
                >
                  {title}
                </h2>

                <span style={{ color }}>♡</span>
              </div>

              <p
                className="mt-1 text-xs"
                style={{ color: muted }}
              >
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border bg-white/70 px-4 py-2 text-center">
              <span
                className="font-serif text-lg"
                style={{ color }}
              >
                {totalGuests}
              </span>

              <span
                className="ml-2 text-[9px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: muted }}
              >
                guests
              </span>
            </div>

            <div className="rounded-full border bg-white/70 px-4 py-2 text-center">
              <span
                className="font-serif text-lg"
                style={{ color: charcoal }}
              >
                {guests.length}
              </span>

              <span
                className="ml-2 text-[9px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: muted }}
              >
                RSVP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Guest content */}
      <div className="p-3 sm:p-5">
        {guests.length === 0 ? (
          <EmptyGuests color={color} />
        ) : (
          <div className="space-y-3">
            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl border md:block">
              <div
                className="grid grid-cols-[1.5fr_.6fr_1.4fr_1.4fr_130px] gap-4 px-5 py-3"
                style={{
                  backgroundColor: "#F5F1F4",
                  borderBottom: "1px solid #E0D9DF",
                }}
              >
                <TableHeader>Main Guest</TableHeader>
                <TableHeader>Count</TableHeader>
                <TableHeader>Plus Ones</TableHeader>
                <TableHeader>Notes</TableHeader>
                <TableHeader>Actions</TableHeader>
              </div>

              <AnimatePresence initial={false}>
                {guests.map((guest, index) => (
                  <motion.div
                    key={guest.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{
                      delay: index * 0.03,
                    }}
                  >
                    {editingId === guest.id ? (
                      <DesktopEditRow
                        guest={guest}
                        color={color}
                        editFormData={editFormData}
                        editError={editError}
                        onCancel={onCancelEditing}
                        onSubmit={onSubmitEdit}
                        onGuestCountChange={
                          onGuestCountChange
                        }
                        onAdditionalGuestChange={
                          onAdditionalGuestChange
                        }
                        setEditFormData={
                          setEditFormData
                        }
                      />
                    ) : (
                      <GuestTableRow
                        guest={guest}
                        color={color}
                        onEdit={() =>
                          onStartEditing(guest)
                        }
                        onDelete={onDelete}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {guests.map((guest, index) => (
                <motion.div
                  key={guest.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.04,
                  }}
                >
                  {editingId === guest.id ? (
                    <MobileEditCard
                      guest={guest}
                      color={color}
                      editFormData={editFormData}
                      editError={editError}
                      onCancel={onCancelEditing}
                      onSubmit={onSubmitEdit}
                      onGuestCountChange={
                        onGuestCountChange
                      }
                      onAdditionalGuestChange={
                        onAdditionalGuestChange
                      }
                      setEditFormData={setEditFormData}
                    />
                  ) : (
                    <GuestMobileCard
                      guest={guest}
                      color={color}
                      onEdit={() =>
                        onStartEditing(guest)
                      }
                      onDelete={onDelete}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

/*
 * ================================================================
 * TABLE COMPONENTS
 * ================================================================
 */

function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="text-[9px] font-bold uppercase tracking-[0.18em]"
      style={{ color: muted }}
    >
      {children}
    </span>
  );
}

function GuestTableRow({
  guest,
  color,
  onEdit,
  onDelete,
}: {
  guest: any;
  color: string;
  onEdit: () => void;
  onDelete: (id: number) => void;
}) {
  const additionalGuests = Array.isArray(
    guest.additional_guests
  )
    ? guest.additional_guests.filter(
        (name: string) => name?.trim()
      )
    : [];

  return (
    <div
      className="group grid grid-cols-[1.5fr_.6fr_1.4fr_1.4fr_130px] gap-4 border-b px-5 py-4 transition last:border-b-0 hover:bg-[#FAF7F9]"
      style={{ borderColor: "#ECE7EB" }}
    >
      <div className="min-w-0">
        <p
          className="truncate font-serif text-base"
          style={{ color: charcoal }}
        >
          {guest.name || "Unnamed guest"}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />

          <span
            className="text-[9px] uppercase tracking-[0.12em]"
            style={{ color: muted }}
          >
            Confirmed
          </span>
        </div>
      </div>

      <div className="flex items-center">
        <span
          className="inline-flex h-8 min-w-8 items-center justify-center rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${color}18`,
            color,
          }}
        >
          {guest.total_guests || 1}
        </span>
      </div>

      <div className="flex min-w-0 items-center">
        {additionalGuests.length > 0 ? (
          <div className="space-y-1">
            {additionalGuests.map(
              (name: string, index: number) => (
                <p
                  key={`${name}-${index}`}
                  className="truncate text-xs"
                  style={{ color: charcoal }}
                >
                  + {name}
                </p>
              )
            )}
          </div>
        ) : (
          <span
            className="text-xs italic"
            style={{ color: "#AAA39E" }}
          >
            No plus ones
          </span>
        )}
      </div>

      <div className="flex min-w-0 items-center">
        {guest.notes ? (
          <p
            className="line-clamp-2 text-xs leading-5"
            style={{ color: muted }}
          >
            {guest.notes}
          </p>
        ) : (
          <span
            className="text-xs italic"
            style={{ color: "#AAA39E" }}
          >
            —
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <ActionButton
          label="Edit guest"
          onClick={onEdit}
          icon={<Pencil size={14} />}
          color={color}
        />

        <ActionButton
          label="Delete guest"
          onClick={() => onDelete(guest.id)}
          icon={<Trash2 size={14} />}
          danger
        />
      </div>
    </div>
  );
}

/*
 * ================================================================
 * MOBILE GUEST CARD
 * ================================================================
 */

function GuestMobileCard({
  guest,
  color,
  onEdit,
  onDelete,
}: {
  guest: any;
  color: string;
  onEdit: () => void;
  onDelete: (id: number) => void;
}) {
  const additionalGuests = Array.isArray(
    guest.additional_guests
  )
    ? guest.additional_guests.filter(
        (name: string) => name?.trim()
      )
    : [];

  return (
    <div
      className="rounded-2xl border bg-white/70 p-4 shadow-sm"
      style={{ borderColor: "#E2DCE1" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />

            <h3
              className="truncate font-serif text-lg"
              style={{ color: charcoal }}
            >
              {guest.name || "Unnamed guest"}
            </h3>
          </div>

          <p
            className="mt-1 text-[9px] font-semibold uppercase tracking-[0.15em]"
            style={{ color: muted }}
          >
            Confirmed RSVP
          </p>
        </div>

        <div
          className="flex h-9 min-w-9 items-center justify-center rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${color}18`,
            color,
          }}
        >
          {guest.total_guests || 1}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <InfoBlock
          icon={<UserRound size={13} />}
          label="Plus Ones"
          color={color}
        >
          {additionalGuests.length > 0 ? (
            <div className="space-y-0.5">
              {additionalGuests.map(
                (name: string, index: number) => (
                  <p key={`${name}-${index}`}>
                    {name}
                  </p>
                )
              )}
            </div>
          ) : (
            <span className="italic">None</span>
          )}
        </InfoBlock>

        <InfoBlock
          icon={<FileText size={13} />}
          label="Notes"
          color={color}
        >
          {guest.notes || (
            <span className="italic">No notes</span>
          )}
        </InfoBlock>
      </div>

      <div
        className="mt-4 flex gap-2 border-t pt-3"
        style={{ borderColor: "#ECE7EB" }}
      >
        <button
          type="button"
          onClick={onEdit}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition hover:bg-[#F2EDF4]"
          style={{
            borderColor: "#DDD5DD",
            color: color,
          }}
        >
          <Pencil size={13} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(guest.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition hover:bg-[#F9EEEE]"
          style={{
            borderColor: "#E5D6D6",
            color: "#A26E6E",
          }}
        >
          <Trash2 size={13} />
          Delete
        </button>
      </div>
    </div>
  );
}

/*
 * ================================================================
 * DESKTOP EDIT ROW
 * ================================================================
 */

function DesktopEditRow({
  guest,
  color,
  editFormData,
  editError,
  onCancel,
  onSubmit,
  onGuestCountChange,
  onAdditionalGuestChange,
  setEditFormData,
}: {
  guest: any;
  color: string;
  editFormData: any;
  editError: string | null;
  onCancel: () => void;
  onSubmit: (id: number) => void;
  onGuestCountChange: (value: number) => void;
  onAdditionalGuestChange: (
    index: number,
    value: string
  ) => void;
  setEditFormData: (data: any) => void;
}) {
  const additionalGuests = Array.isArray(
    editFormData.additional_guests
  )
    ? editFormData.additional_guests
    : [];

  return (
    <div
      className="border-b p-5 last:border-b-0"
      style={{
        backgroundColor: "#FAF7FB",
        borderColor: "#E6DEE7",
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p
            className="font-serif text-xl"
            style={{ color: charcoal }}
          >
            Editing RSVP
          </p>

          <p
            className="mt-1 text-xs"
            style={{ color: muted }}
          >
            Update the guest details below.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-full p-2 transition hover:bg-white"
          style={{ color: muted }}
        >
          <X size={17} />
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <EditField label="Main Guest">
          <input
            value={editFormData.name || ""}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                name: e.target.value,
              })
            }
            className="edit-input"
            style={{ borderColor: "#DCD4DD" }}
          />
        </EditField>

        <EditField label="Total Guests">
          <div className="relative">
            <select
              value={editFormData.total_guests || 1}
              onChange={(e) =>
                onGuestCountChange(Number(e.target.value))
              }
              className="edit-input appearance-none pr-10"
              style={{ borderColor: "#DCD4DD" }}
            >
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>
                  {number} guest{number === 1 ? "" : "s"}
                </option>
              ))}
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: muted }}
            />
          </div>
        </EditField>

        {additionalGuests.map(
          (_: string, index: number) => (
            <EditField
              key={index}
              label={`Plus One ${index + 1}`}
            >
              <input
                value={additionalGuests[index] || ""}
                onChange={(e) =>
                  onAdditionalGuestChange(
                    index,
                    e.target.value
                  )
                }
                placeholder={`Guest ${index + 1} name`}
                className="edit-input"
                style={{ borderColor: "#DCD4DD" }}
              />
            </EditField>
          )
        )}

        <EditField label="Notes">
          <textarea
            value={editFormData.notes || ""}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                notes: e.target.value,
              })
            }
            rows={2}
            className="edit-input resize-none"
            style={{ borderColor: "#DCD4DD" }}
          />
        </EditField>
      </div>

      {editError && (
        <EditError message={editError} />
      )}

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{
            borderColor: "#DDD5DD",
            color: muted,
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => onSubmit(guest.id)}
          className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white"
          style={{
            backgroundColor: color,
          }}
        >
          <Check size={14} />
          Save Changes
        </button>
      </div>
    </div>
  );
}

/*
 * ================================================================
 * MOBILE EDIT CARD
 * ================================================================
 */

function MobileEditCard({
  guest,
  color,
  editFormData,
  editError,
  onCancel,
  onSubmit,
  onGuestCountChange,
  onAdditionalGuestChange,
  setEditFormData,
}: {
  guest: any;
  color: string;
  editFormData: any;
  editError: string | null;
  onCancel: () => void;
  onSubmit: (id: number) => void;
  onGuestCountChange: (value: number) => void;
  onAdditionalGuestChange: (
    index: number,
    value: string
  ) => void;
  setEditFormData: (data: any) => void;
}) {
  const additionalGuests = Array.isArray(
    editFormData.additional_guests
  )
    ? editFormData.additional_guests
    : [];

  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: "#FAF7FB",
        borderColor: "#DED6E0",
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3
            className="font-serif text-xl"
            style={{ color: charcoal }}
          >
            Edit RSVP
          </h3>

          <p
            className="mt-1 text-xs"
            style={{ color: muted }}
          >
            {guest.name}
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-full p-2"
          style={{ color: muted }}
        >
          <X size={17} />
        </button>
      </div>

      <div className="space-y-4">
        <EditField label="Main Guest">
          <input
            value={editFormData.name || ""}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                name: e.target.value,
              })
            }
            className="edit-input"
            style={{ borderColor: "#DCD4DD" }}
          />
        </EditField>

        <EditField label="Total Guests">
          <div className="relative">
            <select
              value={editFormData.total_guests || 1}
              onChange={(e) =>
                onGuestCountChange(Number(e.target.value))
              }
              className="edit-input appearance-none pr-10"
              style={{ borderColor: "#DCD4DD" }}
            >
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>
                  {number} guest{number === 1 ? "" : "s"}
                </option>
              ))}
            </select>

            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: muted }}
            />
          </div>
        </EditField>

        {additionalGuests.map(
          (_: string, index: number) => (
            <EditField
              key={index}
              label={`Plus One ${index + 1}`}
            >
              <input
                value={additionalGuests[index] || ""}
                onChange={(e) =>
                  onAdditionalGuestChange(
                    index,
                    e.target.value
                  )
                }
                placeholder="Guest name"
                className="edit-input"
                style={{ borderColor: "#DCD4DD" }}
              />
            </EditField>
          )
        )}

        <EditField label="Notes">
          <textarea
            value={editFormData.notes || ""}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                notes: e.target.value,
              })
            }
            rows={3}
            className="edit-input resize-none"
            style={{ borderColor: "#DCD4DD" }}
          />
        </EditField>
      </div>

      {editError && (
        <EditError message={editError} />
      )}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border py-3 text-[10px] font-semibold uppercase tracking-[0.13em]"
          style={{
            borderColor: "#DDD5DD",
            color: muted,
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => onSubmit(guest.id)}
          className="flex items-center justify-center gap-2 rounded-xl py-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-white"
          style={{ backgroundColor: color }}
        >
          <Check size={14} />
          Save
        </button>
      </div>
    </div>
  );
}

/*
 * ================================================================
 * SMALL UI COMPONENTS
 * ================================================================
 */

function ActionButton({
  label,
  icon,
  onClick,
  color,
  danger = false,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border transition hover:-translate-y-0.5"
      style={{
        borderColor: danger ? "#E5D6D6" : "#DED7DE",
        color: danger ? "#A26E6E" : color,
        backgroundColor: danger
          ? "#FFF9F9"
          : "rgba(255,255,255,.6)",
      }}
    >
      {icon}
    </button>
  );
}

function InfoBlock({
  icon,
  label,
  color,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1.5">
        <span style={{ color }}>{icon}</span>

        <span
          className="text-[8px] font-bold uppercase tracking-[0.18em]"
          style={{ color: muted }}
        >
          {label}
        </span>
      </div>

      <div
        className="text-xs leading-5"
        style={{ color: charcoal }}
      >
        {children}
      </div>
    </div>
  );
}

function EditField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: muted }}
      >
        {label}
      </span>

      {children}
    </label>
  );
}

function EditError({
  message,
}: {
  message: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 rounded-xl border px-4 py-3 text-xs"
      style={{
        backgroundColor: "#FFF5F5",
        borderColor: "#E9D5D5",
        color: "#9B6868",
      }}
    >
      {message}
    </motion.div>
  );
}

function EmptyGuests({
  color,
}: {
  color: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-12 text-center"
      style={{
        borderColor: "#DCD5DB",
        backgroundColor: "#FCFAFC",
      }}
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-4 text-3xl"
        style={{ color }}
      >
        ♡
      </motion.div>

      <h3
        className="font-serif text-xl"
        style={{ color: charcoal }}
      >
        No RSVPs yet
      </h3>

      <p
        className="mt-2 max-w-xs text-xs leading-5"
        style={{ color: muted }}
      >
        The guest list is waiting for its first little
        “yes” ✦
      </p>
    </div>
  );
}





function DeclinedGuestsSection({
  guests,
  editingId,
  editFormData,
  editError,
  onStartEditing,
  onCancelEditing,
  onSubmitEdit,
  onDelete,
  setEditFormData,
}: {
  guests: any[];
  editingId: number | null;
  editFormData: any;
  editError: string | null;
  onStartEditing: (guest: any) => void;
  onCancelEditing: () => void;
  onSubmitEdit: (id: number) => void;
  onDelete: (id: number) => void;
  setEditFormData: (data: any) => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-[2rem] border bg-white/60 shadow-[0_20px_60px_rgba(64,60,58,0.08)]"
      style={{ borderColor: "#DED7DE" }}
    >
      {/* Section header */}
      <div
        className="relative overflow-hidden px-5 py-5 sm:px-7"
        style={{ backgroundColor: lavenderSoft }}
      >
        <div
          className="absolute -right-10 -top-14 h-36 w-36 rounded-full opacity-50"
          style={{ backgroundColor: lavender }}
        />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white/60"
              style={{
                borderColor: `${lavender}55`,
                color: lavender,
              }}
            >
              <Heart size={20} fill="currentColor" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2
                  className="font-serif text-2xl sm:text-3xl"
                  style={{ color: charcoal }}
                >
                  Regretfully Declined
                </h2>
                <span style={{ color: lavender }}>♡</span>
              </div>

              <p
                className="mt-1 text-xs"
                style={{ color: muted }}
              >
                Guests who won't be able to celebrate with us
              </p>
            </div>
          </div>

          <div className="rounded-full border bg-white/70 px-4 py-2 text-center">
            <span
              className="font-serif text-lg"
              style={{ color: lavender }}
            >
              {guests.length}
            </span>
            <span
              className="ml-2 text-[9px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: muted }}
            >
              declined
            </span>
          </div>
        </div>
      </div>

      {/* Guest content */}
      <div className="p-3 sm:p-5">
        {guests.length === 0 ? (
          <p
            className="py-6 text-center text-sm italic"
            style={{ color: muted }}
          >
            No declined RSVPs yet ♡
          </p>
        ) : (
          <div
            className="overflow-hidden rounded-2xl border bg-white/70"
            style={{ borderColor: "#E2DCE1" }}
          >
            <div className="divide-y divide-[#ECE7EB]">
              {guests.map((guest, index) => (
                <motion.div
                  key={guest.id}
                  layout
                  className="px-4 py-4 transition hover:bg-[#FAF7F9] sm:px-5"
                >
                  {editingId === guest.id ? (
                    <div className="space-y-3">
                      <div>
                        <label
                          className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em]"
                          style={{ color: muted }}
                        >
                          Guest Name
                        </label>

                        <input
                          autoFocus
                          value={editFormData?.name || ""}
                          onChange={(e) => {
                            setEditFormData({
                              ...editFormData,
                              name: e.target.value,
                            });
                          }}
                          className="edit-input"
                          style={{ borderColor: "#DCD4DD" }}
                        />
                      </div>

                      {editError && (
                        <EditError message={editError} />
                      )}

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={onCancelEditing}
                          className="rounded-xl border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
                          style={{
                            borderColor: "#DDD5DD",
                            color: muted,
                          }}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={() => onSubmitEdit(guest.id)}
                          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white"
                          style={{ backgroundColor: lavender }}
                        >
                          <Check size={14} />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${lavender}18`,
                          color: lavender,
                        }}
                      >
                        {index + 1}
                      </span>

                      <p
                        className="min-w-0 flex-1 truncate font-serif text-base"
                        style={{ color: charcoal }}
                      >
                        {guest.name || "Unnamed guest"}
                      </p>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <ActionButton
                          label="Edit guest"
                          onClick={() => onStartEditing(guest)}
                          icon={<Pencil size={14} />}
                          color={lavender}
                        />

                        <ActionButton
                          label="Delete guest"
                          onClick={() => onDelete(guest.id)}
                          icon={<Trash2 size={14} />}
                          danger
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}


function SongRecommendationsSection({
  recommendations,
  loading,
  error,
  onDelete,
}: {
  recommendations: any[];
  loading: boolean;
  error: string;
  onDelete: (id: number) => void;
}) {
  const totalSongs = recommendations.length;

  const uniqueGuests = new Set(
    recommendations.map((song) => song.guest_name?.trim()).filter(Boolean)
  ).size;

  // Group songs by guest
  const groupedSongs = recommendations.reduce(
    (groups: Record<string, any[]>, song) => {
      const guestName = song.guest_name?.trim() || "Unknown Guest";

      if (!groups[guestName]) {
        groups[guestName] = [];
      }

      groups[guestName].push(song);

      return groups;
    },
    {}
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-[2rem] border bg-white/60 shadow-[0_20px_60px_rgba(64,60,58,0.08)]"
      style={{ borderColor: "#DED7DE" }}
    >
      {/* Header */}
      <div
        className="relative overflow-hidden px-5 py-6 sm:px-7"
        style={{ backgroundColor: oliveLight }}
      >
        <div
          className="absolute -right-10 -top-14 h-36 w-36 rounded-full opacity-40"
          style={{ backgroundColor: olive }}
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white/60"
              style={{
                borderColor: `${olive}55`,
                color: olive,
              }}
            >
              <Music2 size={21} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2
                  className="font-serif text-2xl sm:text-3xl"
                  style={{ color: charcoal }}
                >
                  Wedding Playlist
                </h2>

                <span style={{ color: olive }}>♡</span>
              </div>

              <p
                className="mt-1 text-xs"
                style={{ color: muted }}
              >
                Songs chosen by your family and friends
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="rounded-full border bg-white/70 px-4 py-2 text-center">
              <span
                className="font-serif text-lg"
                style={{ color: olive }}
              >
                {totalSongs}
              </span>

              <span
                className="ml-2 text-[9px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: muted }}
              >
                Songs
              </span>
            </div>

            <div className="rounded-full border bg-white/70 px-4 py-2 text-center">
              <span
                className="font-serif text-lg"
                style={{ color: lavender }}
              >
                {uniqueGuests}
              </span>

              <span
                className="ml-2 text-[9px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: muted }}
              >
                Guests
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">

        {loading ? (
          <div className="flex flex-col items-center py-12">
            <Loader2
              size={28}
              className="animate-spin"
              style={{ color: lavender }}
            />

            <p
              className="mt-3 text-sm"
              style={{ color: muted }}
            >
              Loading wedding playlist...
            </p>
          </div>
        ) : error ? (
          <p className="py-8 text-center text-sm text-red-600">
            {error}
          </p>
        ) : recommendations.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <Music2
              size={30}
              style={{ color: lavender }}
            />

            <h3
              className="mt-4 font-serif text-xl"
              style={{ color: charcoal }}
            >
              No songs yet
            </h3>

            <p
              className="mt-2 text-xs"
              style={{ color: muted }}
            >
              Your guests' song recommendations will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {Object.entries(groupedSongs).map(
              ([guestName, songs]) => (
                <div
                  key={guestName}
                  className="overflow-hidden rounded-2xl border bg-white/60"
                  style={{ borderColor: "#E2DCE1" }}
                >
                  {/* Guest heading */}
                  <div
                    className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5"
                    style={{
                      backgroundColor: "#F8F5F8",
                      borderColor: "#E9E2E9",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: lavenderSoft,
                          color: lavender,
                        }}
                      >
                        <UserRound size={17} />
                      </div>

                      <div>
                        <h3
                          className="font-serif text-base"
                          style={{ color: charcoal }}
                        >
                          {guestName}
                        </h3>

                        <p
                          className="text-[9px] uppercase tracking-[0.15em]"
                          style={{ color: muted }}
                        >
                          Guest Recommendation
                        </p>
                      </div>
                    </div>

                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: oliveLight,
                        color: olive,
                      }}
                    >
                      {songs.length} {songs.length === 1 ? "Song" : "Songs"}
                    </span>
                  </div>

                  {/* Songs */}
                  <div className="divide-y divide-[#ECE7EB]">
                    {songs.map((song, index) => (
                      <div
                        key={song.id ?? `${song.track_id}-${index}`}
                        className="flex items-center gap-3 px-4 py-3 transition hover:bg-[#FAF7F9] sm:px-5"
                      >
                        <span
                          className="w-5 shrink-0 text-center text-xs font-semibold"
                          style={{ color: lavender }}
                        >
                          {index + 1}
                        </span>

                        {song.artwork_url ? (
                          <img
                            src={song.artwork_url}
                            alt=""
                            className="h-12 w-12 shrink-0 rounded-xl object-cover shadow-sm"
                          />
                        ) : (
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                            style={{
                              backgroundColor: lavenderSoft,
                              color: lavender,
                            }}
                          >
                            <Music2 size={20} />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p
                            className="truncate font-serif text-sm sm:text-base"
                            style={{ color: charcoal }}
                          >
                            {song.track_name}
                          </p>

                          <p
                            className="mt-0.5 truncate text-xs"
                            style={{ color: muted }}
                          >
                            {song.artist_name}
                          </p>

                          {song.album_name && (
                            <p
                              className="mt-0.5 truncate text-[10px]"
                              style={{ color: "#A49B96" }}
                            >
                              {song.album_name}
                            </p>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-1">
                        {song.track_url && (
                          <a
                            href={song.track_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Listen to ${song.track_name}`}
                            title="Listen to song"
                            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#EEE8F2]"
                            style={{ color: lavender }}
                          >
                            <Music2 size={17} />
                          </a>
                        )}

                        {song.id != null && (
                          <button
                            type="button"
                            onClick={() => onDelete(song.id)}
                            aria-label={`Delete ${song.track_name}`}
                            title="Delete song"
                            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-red-50"
                            style={{ color: "#B76E79" }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
