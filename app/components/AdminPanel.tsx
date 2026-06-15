"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Trash2 } from 'lucide-react';

interface AdminPanelProps {
  isAuthenticated: boolean;
  password: React.ComponentState;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  handleLogin: (e: React.FormEvent) => void;
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

export default function AdminPanel({
  isAuthenticated, password, setPassword, showPassword, setShowPassword, handleLogin,
  guests, editingId, setEditingId, editFormData, setEditFormData, editError, setEditError,
  handleUpdateGuest, handleDeleteGuest, fetchGuests
}: AdminPanelProps) {
  
  if (!isAuthenticated) {
    return (
      <section className="min-h-screen pt-36 pb-24 px-6 bg-[#FDFBF7] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center bg-white p-10 rounded-2xl border border-stone-200/60 shadow-md">
          <div className="w-14 h-14 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-stone-100">
            <Lock className="text-[#D4AF37]" size={24} />
          </div>
          <h2 className="text-xl font-light mb-8 uppercase tracking-widest text-slate-800">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative border-b border-slate-200 pb-1 focus-within:border-[#1A3A3A] transition-all">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full bg-transparent py-2.5 outline-none text-center tracking-wide font-sans" 
                placeholder="Enter Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-3 text-slate-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button type="submit" className="w-full bg-[#1A3A3A] text-white py-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.15em]">
              Login
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-36 pb-24 px-6 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b border-stone-200 pb-8">
          <div>
            <h2 className="text-4xl font-light tracking-wide font-serif text-slate-800">Guest List</h2>
            <p className="text-[#D4AF37] mt-2 uppercase tracking-widest text-[10px] font-semibold">Amir & Méhrati's Wedding Dashboard</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-xl border border-stone-200/60 text-center shadow-sm min-w-[160px]">
            <p className="text-3xl font-light text-[#1A3A3A.]">{guests.reduce((acc, g) => acc + (g.total_guests || 1), 0)}</p>
            <p className="text-[9px] uppercase tracking-widest opacity-60 font-sans font-semibold mt-1">Confirmed Guests</p>
          </div>
        </div>

        {['Groom', 'Bride'].map((currentSide) => (
          <div key={currentSide} className="mb-20">
            <h3 className="text-xs mb-6 flex items-center gap-3 uppercase tracking-[0.25em] text-[#1A3A3A] font-semibold font-sans">
              <div className="h-0.5 w-6 bg-[#D4AF37]" />
              {currentSide === 'Groom' ? "Amir's Side" : "éhrati's Side"}
              <span className="text-[11px] text-slate-400 font-normal font-serif italic ml-auto">
                ({guests.filter(g => g.side === currentSide).reduce((acc, g) => acc + (g.total_guests || 1), 0)} guests)
              </span>
            </h3>

            <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-stone-200/60">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1A3A3A] text-white text-[10px] uppercase tracking-widest font-sans">
                    <th className="p-5 font-medium">Main Guest</th>
                    <th className="p-5 font-medium">Count</th>
                    <th className="p-5 font-medium">Plus Ones</th>
                    <th className="p-5 font-medium">Notes</th>
                    <th className="p-5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-sans text-slate-700">
                  {guests.filter(g => g.side === currentSide).map((guest) => (
                    <tr key={guest.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                      {editingId === guest.id ? (
                        <>
                          <td className="p-4"><input className="border rounded-lg p-2 w-full text-xs" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} /></td>
                          <td className="p-4">
                            <input type="number" className="border rounded-lg p-2 w-16 text-xs text-center" value={editFormData.total_guests} onChange={(e) => setEditFormData({...editFormData, total_guests: parseInt(e.target.value)})} />
                          </td>
                          <td className="p-4">
                            {editFormData.additional_guests?.map((name: string, i: number) => (
                              <input key={i} className="border rounded-lg p-1.5 w-full mb-1 text-xs" value={name} onChange={(e) => {
                                const n = [...editFormData.additional_guests]; n[i] = e.target.value;
                                setEditFormData({...editFormData, additional_guests: n});
                              }} />
                            ))}
                          </td>
                          <td className="p-4">
                            <textarea className="border rounded-lg p-2 w-full text-xs h-14" value={editFormData.notes} onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})} />
                            {editError && <div className="text-red-600 text-[10px] mt-1">{editError}</div>}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => {
                                  // 1 (Main Guest) + length of filled out additional guest input values
                                  const validPlusOnes = editFormData.additional_guests?.filter((n: string) => n && n.trim().length > 0) || [];
                                  const expectedCount = 1 + validPlusOnes.length;

                                  if (editFormData.total_guests !== expectedCount) {
                                    setEditError(`The guest count (${editFormData.total_guests}) does not match the number of names listed (${expectedCount}).`);
                                  } else {
                                    setEditError(null);
                                    handleUpdateGuest(guest.id);
                                  }
                                }} 
                                className="px-3.5 py-1.5 bg-emerald-600 text-white text-[10px] uppercase rounded-lg font-bold"
                              >
                                Save
                              </button>
                              <button onClick={() => { setEditingId(null); setEditError(null); }} className="px-3.5 py-1.5 bg-stone-200 text-stone-700 text-[10px] uppercase rounded-lg font-bold">Cancel</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-5 font-serif font-medium text-slate-800 text-base">{guest.name}</td>
                          <td className="p-5 text-slate-600 font-medium"><span className="px-2.5 py-1 bg-stone-100 rounded-md text-xs">{guest.total_guests}</span></td>
                          <td className="p-5 text-slate-500 italic text-xs max-w-[200px] truncate">{guest.additional_guests?.filter((n: string) => n.trim()).join(', ') || '—'}</td>
                          <td className="p-5 text-xs text-slate-400 max-w-xs truncate">{guest.notes || '—'}</td>
                          <td className="p-5 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => { setEditingId(guest.id); setEditFormData(guest); }} className="px-3.5 py-1.5 border border-stone-200 text-slate-600 text-[10px] uppercase rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37]">Edit</button>
                              <button onClick={() => handleDeleteGuest(guest.id)} className="px-3.5 py-1.5 text-rose-500 hover:bg-rose-50 text-[10px] uppercase rounded-lg flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <div className="text-center">
          <button onClick={fetchGuests} className="inline-block border border-stone-300 bg-white px-6 py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1A3A3A] hover:bg-stone-50 transition-colors shadow-sm">Refresh All Data</button>
        </div>
      </div>
    </section>
  );
}