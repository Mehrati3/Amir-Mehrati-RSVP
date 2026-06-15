"use client";
import React, { useState, useEffect } from 'react'; 
import { supabase } from './lib/supabase';

// Importing Custom Sub-Components
import RoyalEntrance from './components/RoyalEntrance';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import DetailsSection from './components/DetailsSection';
import RsvpSection from './components/RsvpSection';
import AdminPanel from './components/AdminPanel';

export default function WeddingInvitation() {
  const [view, setView] = useState<'invite' | 'admin'>('invite'); 
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [guests, setGuests] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [curtainsOpen, setCurtainsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCurtainsOpen(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const extraNames = [];
    for (let i = 1; i < guestCount; i++) {
      const name = formData.get(`extraName_${i}`);
      if (name) extraNames.push(name);
    }

    const { error } = await supabase.from('rsvps').insert([{
      name: formData.get('guestName'),
      status: "Attending", 
      side: formData.get('side'), 
      total_guests: guestCount,
      additional_guests: extraNames,
      notes: formData.get('dietary'),
    }]);

    if (!error) setSubmitted(true);
    setLoading(false);
  };

  const fetchGuests = async () => {
    const { data } = await supabase.from('rsvps').select('*').order('created_at', { ascending: false });
    setGuests(data || []);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2027') { 
      setIsAuthenticated(true);
      fetchGuests();
    } else {
      alert("Incorrect password");
    }
  };

  const handleUpdateGuest = async (id: number) => {
    const { error } = await supabase.from('rsvps').update({
      name: editFormData.name,
      total_guests: editFormData.total_guests,
      notes: editFormData.notes,
      additional_guests: editFormData.additional_guests,
      side: editFormData.side 
    }).eq('id', id);

    if (!error) { setEditingId(null); fetchGuests(); }
  };

  const handleDeleteGuest = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('rsvps').delete().eq('id', id);
    if (!error) fetchGuests();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-serif text-[#2A3B3B] overflow-x-hidden relative">
      <RoyalEntrance curtainsOpen={curtainsOpen} view={view} />

      {/* Navigation tabs */}
      <div className="fixed top-6 right-6 z-40 flex gap-2.5">
        <button onClick={() => setView('invite')} className={`px-5 py-2.5 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase transition-all ${view === 'invite' ? 'bg-[#D4AF37] text-white shadow-md' : 'bg-white/90 text-slate-500'}`}>Invitation</button>
        <button onClick={() => setView('admin')} className={`px-5 py-2.5 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase transition-all ${view === 'admin' ? 'bg-[#1A3A3A] text-white shadow-md' : 'bg-white/90 text-slate-500'}`}>Guest List</button>
      </div>

      {view === 'invite' ? (
        <>
          <HeroSection curtainsOpen={curtainsOpen} />
          <GallerySection />
          <DetailsSection />
          <RsvpSection submitted={submitted} guestCount={guestCount} loading={loading} setGuestCount={setGuestCount} onSubmit={handleSubmit} />
          <footer className="py-20 text-center opacity-40 text-[10px] uppercase tracking-[0.5em] text-[#1A3A3A] font-medium">Amir & Mehrati • May 08, 2027</footer>
        </>
      ) : (
        <AdminPanel 
          isAuthenticated={isAuthenticated} password={password} setPassword={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} handleLogin={handleLogin}
          guests={guests} editingId={editingId} setEditingId={setEditingId} editFormData={editFormData} setEditFormData={setEditFormData} editError={editError} setEditError={setEditError}
          handleUpdateGuest={handleUpdateGuest} handleDeleteGuest={handleDeleteGuest} fetchGuests={fetchGuests}
        />
      )}
    </div>
  );
}