"use client";

import React, { useState } from "react";
import { supabase } from "./lib/supabase";

import RoyalEntrance from "./components/RoyalEntrance";
import HeroSection from "./components/HeroSection";
import GallerySection from "./components/GallerySection";
import DetailsSection from "./components/DetailsSection";
import RsvpSection from "./components/RsvpSection";
import AdminPanel from "./components/AdminPanel";

export default function WeddingInvitation() {
  const [view, setView] = useState<"invite" | "admin">("invite");

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [guests, setGuests] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [editError, setEditError] = useState<string | null>(null);

  
const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const attendanceStatus =
      formData.get("attendanceStatus")?.toString() || "Attending";

    const guestName = formData.get("guestName")?.toString().trim();

    const extraNames: string[] = [];

    if (attendanceStatus === "Attending") {
      for (let i = 1; i < guestCount; i++) {
        const name = formData.get(`extraName_${i}`)?.toString().trim();

        if (name) {
          extraNames.push(name);
        }
      }
    }

    const { error } = await supabase.from("rsvps").insert([
      {
        name: guestName,
        status: attendanceStatus,
        side:
          attendanceStatus === "Attending"
            ? formData.get("side")
            : null,
        total_guests:
          attendanceStatus === "Attending" ? guestCount : 0,
        additional_guests: extraNames,
        notes:
          attendanceStatus === "Attending"
            ? formData.get("dietary")
            : null,
      },
    ]);

    if (error) {
      console.error("RSVP submission error:", error);
      alert("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
    }

    setLoading(false);
  };


  const fetchGuests = async () => {
    const { data } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setGuests(data || []);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "2027") {
      setIsAuthenticated(true);
      fetchGuests();
    } else {
      alert("Incorrect password");
    }
  };

  const handleUpdateGuest = async (id: number) => {
    const { error } = await supabase
      .from("rsvps")
      .update({
        name: editFormData.name,
        total_guests: editFormData.total_guests,
        notes: editFormData.notes,
        additional_guests: editFormData.additional_guests,
        side: editFormData.side,
      })
      .eq("id", id);

    if (!error) {
      setEditingId(null);
      fetchGuests();
    }
  };

  const handleDeleteGuest = async (id: number) => {
    if (!confirm("Are you sure?")) return;

    const { error } = await supabase
      .from("rsvps")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchGuests();
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FDFBF7] font-serif text-[#2A3B3B]">
      {/* THE ENVELOPE / REAL INVITATION */}
      <RoyalEntrance view={view} />

      {/* Navigation */}
      <div className="fixed right-5 top-5 z-[90] flex gap-2 sm:right-6 sm:top-6">
        {/* Invitation */}
        <button
          onClick={() => setView("invite")}
          className={`group relative overflow-hidden rounded-full border px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:px-6 ${
            view === "invite"
              ? "border-[#9A8EAA] bg-[#9A8EAA] text-white shadow-[0_8px_24px_rgba(154,142,170,0.28)]"
              : "border-[#A99ABB]/40 bg-[#FCF8F1]/90 text-[#887A99] backdrop-blur-md hover:-translate-y-0.5 hover:border-[#9A8EAA]/70 hover:bg-[#F5F0F7]"
          }`}
        >
          {/* soft shine */}
          {view === "invite" && (
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          )}

          <span className="relative flex items-center gap-2">
            <span className="text-[12px]">♡</span>
            Invitation
          </span>
        </button>

        {/* Guest List */}
        <button
          onClick={() => setView("admin")}
          className={`group relative overflow-hidden rounded-full border px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:px-6 ${
            view === "admin"
              ? "border-[#7A8065] bg-[#7A8065] text-white shadow-[0_8px_24px_rgba(122,128,101,0.28)]"
              : "border-[#7A8065]/35 bg-[#FCF8F1]/90 text-[#7A8065] backdrop-blur-md hover:-translate-y-0.5 hover:border-[#7A8065]/60 hover:bg-[#F1F2EA]"
          }`}
        >
          {/* soft shine */}
          {view === "admin" && (
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          )}

          <span className="relative flex items-center gap-2">
            <span className="text-[11px]">✦</span>
            Guest List
          </span>
        </button>
      </div>

      {view === "invite" ? (
        <>
          {/* HeroSection is intentionally empty */}
          {/*<HeroSection curtainsOpen={true} />*/}

          

          /<DetailsSection />

          <RsvpSection
            submitted={submitted}
            guestCount={guestCount}
            loading={loading}
            setGuestCount={setGuestCount}
            onSubmit={handleSubmit}
          />

          <footer className="py-20 text-center text-[10px] font-medium uppercase tracking-[0.5em] text-[#1A3A3A] opacity-40">
            Amir & Méhrati • February 6, 2027
          </footer>
        </>
      ) : (
        <AdminPanel
          isAuthenticated={isAuthenticated}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleLogin={handleLogin}
          guests={guests}
          editingId={editingId}
          setEditingId={setEditingId}
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          editError={editError}
          setEditError={setEditError}
          handleUpdateGuest={handleUpdateGuest}
          handleDeleteGuest={handleDeleteGuest}
          fetchGuests={fetchGuests}
        />
      )}
    </div>
  );
}