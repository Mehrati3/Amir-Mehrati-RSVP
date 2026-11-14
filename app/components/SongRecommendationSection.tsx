
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Search,
  Music2,
  Plus,
  Check,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";

type Song = {
  trackId: number;
  trackName: string;
  artistName: string;
  albumName: string;
  artworkUrl: string;
  trackUrl: string;
};

export default function SongRecommendationSection() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [guestName, setGuestName] = useState("");

  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Search for songs
  useEffect(() => {
    const term = search.trim();

    if (term.length < 2) {
      setSongs([]);
      setSearching(false);
      setSearchError("");
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      setSearching(true);
      setSearchError("");

      try {
        const response = await fetch(
          `/api/songs/search?q=${encodeURIComponent(term)}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to search for songs."
          );
        }

        setSongs(data.results || []);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setSongs([]);
        setSearchError(
          "We couldn't search right now. Please try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setSearching(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search]);

  // Add a song to the selection
  const handleSelectSong = (song: Song) => {
    setSelectedSongs((prev) => {
      if (prev.some((item) => item.trackId === song.trackId)) {
        return prev;
      }

      return [...prev, song];
    });

    setSearch("");
    setSongs([]);
    setSuccess("");
    setSubmitError("");
  };

  // Remove a song from the selection
  const handleRemoveSong = (trackId: number) => {
    setSelectedSongs((prev) =>
      prev.filter((song) => song.trackId !== trackId)
    );

    setSuccess("");
    setSubmitError("");
  };

  // Submit all selected songs
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedSongs.length === 0 || !guestName.trim()) return;

    setSaving(true);
    setSuccess("");
    setSubmitError("");

    const recommendations = selectedSongs.map((song) => ({
      guest_name: guestName.trim(),
      track_id: song.trackId,
      track_name: song.trackName,
      artist_name: song.artistName,
      album_name: song.albumName,
      artwork_url: song.artworkUrl,
      track_url: song.trackUrl,
    }));

    const { error } = await supabase
      .from("song_recommendations")
      .insert(recommendations);

    if (error) {
      console.error("Song recommendation error:", error);

      setSubmitError(
        "Something went wrong while saving your songs. Please try again."
      );
    } else {
      setSuccess(
        `Thank you, ${guestName.trim()}! Your ${selectedSongs.length} ${
          selectedSongs.length === 1 ? "song has" : "songs have"
        } been added to our wedding playlist recommendations.`
      );

      setGuestName("");
      setSearch("");
      setSongs([]);
      setSelectedSongs([]);
    }

    setSaving(false);
  };

  return (
    <section
      id="song-recommendations"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
      style={{
        background:
          "linear-gradient(145deg, #F9F6F9 0%, #FDFBF7 50%, #F0F0E9 100%)",
      }}
    >
      {/* Decorative background details */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#A99ABB]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#7A8065]/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div className="mb-5 flex justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#A99ABB]/30 bg-white/70 text-[#9A8EAA] shadow-sm">
              <Music2 size={23} strokeWidth={1.5} />
            </span>
          </div>

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#7A8065]">
            A Little Something From You
          </p>

          <h2 className="font-serif text-4xl text-[#403C3A] sm:text-5xl">
           Help Us Choose the Music
          </h2>

          <div className="mx-auto my-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#A99ABB]/50" />
            <span className="text-[#9A8EAA]">♡</span>
            <span className="h-px w-12 bg-[#A99ABB]/50" />
          </div>

          <p className="mx-auto max-w-xl text-sm leading-7 text-[#77716D]">
            We'd love to hear the songs you enjoy! Search for your favourite songs and add them to our wedding playlist so we can enjoy them together on our special day.
          </p>
        </div>

        {/* Search and selection */}
        <div className="rounded-[2rem] border border-[#DED7DE] bg-white/75 p-5 shadow-[0_20px_60px_rgba(64,60,58,0.07)] backdrop-blur-sm sm:p-8">

          <label
            htmlFor="song-search"
            className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A8065]"
          >
            Find Your Songs
          </label>

          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8EAA]"
            />

            <input
              id="song-search"
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSuccess("");
                setSubmitError("");
              }}
              placeholder="Search by song title"
              className="w-full rounded-2xl border border-[#DED7DE] bg-[#FCFAFC] py-4 pl-12 pr-12 text-sm text-[#403C3A] outline-none transition placeholder:text-[#AAA2AA] focus:border-[#9A8EAA] focus:ring-2 focus:ring-[#9A8EAA]/10"
            />

            {searching && (
              <Loader2
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#9A8EAA]"
              />
            )}
          </div>

          <p className="mt-2 text-[10px] text-[#99918E]">
            Search and add as many songs as you'd like.
          </p>

          {/* Search results */}
          {songs.length > 0 && (
            <div className="mt-5 space-y-2">
              {songs.map((song) => {
                const alreadyAdded = selectedSongs.some(
                  (item) => item.trackId === song.trackId
                );

                return (
                  <button
                    type="button"
                    key={song.trackId}
                    disabled={alreadyAdded}
                    onClick={() => handleSelectSong(song)}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-transparent p-3 text-left transition hover:border-[#DED7DE] hover:bg-[#F8F5F8] disabled:cursor-default disabled:opacity-60"
                  >
                    <img
                      src={song.artworkUrl}
                      alt=""
                      className="h-14 w-14 rounded-xl object-cover shadow-sm"
                    />

                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-serif text-base text-[#403C3A]">
                        {song.trackName}
                      </span>
                      <span className="mt-1 block truncate text-xs text-[#77716D]">
                        {song.artistName}
                      </span>
                    </span>

                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      alreadyAdded
                        ? "bg-[#E9EDE3] text-[#7A8065]"
                        : "bg-[#EEE8F2] text-[#9A8EAA] group-hover:bg-[#9A8EAA] group-hover:text-white"
                    }`}>
                      {alreadyAdded ? (
                        <Check size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {search.length >= 2 &&
            !searching &&
            songs.length === 0 &&
            !searchError && (
              <p className="py-8 text-center text-sm text-[#77716D]">
                No songs found. Try another title or artist.
              </p>
            )}

          {searchError && (
            <p className="mt-4 text-center text-sm text-red-600">
              {searchError}
            </p>
          )}

          {/* Selected songs */}
          {selectedSongs.length > 0 && (
            <div className="mt-7 rounded-2xl border border-[#A99ABB]/30 bg-[#F8F5F9] p-4 sm:p-5">

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A8065]">
                    Your Playlist
                  </p>
                  <p className="mt-1 font-serif text-xl text-[#403C3A]">
                    Your Selected Songs
                  </p>
                </div>

                <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-[#EEE8F2] px-3 text-sm font-semibold text-[#9A8EAA]">
                  {selectedSongs.length}
                </span>
              </div>

              <div className="space-y-3">
                {selectedSongs.map((song, index) => (
                  <div
                    key={song.trackId}
                    className="flex items-center gap-3 rounded-xl border border-[#DED7DE]/70 bg-white p-3"
                  >
                    <span className="text-xs font-semibold text-[#A99ABB]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <img
                      src={song.artworkUrl}
                      alt=""
                      className="h-12 w-12 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-sm text-[#403C3A]">
                        {song.trackName}
                      </p>
                      <p className="truncate text-xs text-[#77716D]">
                        {song.artistName}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveSong(song.trackId)}
                      aria-label={`Remove ${song.trackName}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#9A8EAA] transition hover:bg-[#F2EAF2] hover:text-red-500"
                    >
                      <X size={17} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Guest submission */}
              <form onSubmit={handleSubmit} className="mt-6 border-t border-[#DED7DE] pt-5">
                <label
                  htmlFor="song-guest-name"
                  className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A8065]"
                >
                  Your Name
                </label>

                <input
                  id="song-guest-name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#DED7DE] bg-white px-4 py-3 text-sm text-[#403C3A] outline-none transition placeholder:text-[#AAA2AA] focus:border-[#9A8EAA] focus:ring-2 focus:ring-[#9A8EAA]/10"
                />

                <button
                  type="submit"
                  disabled={saving || !guestName.trim() || selectedSongs.length === 0}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7A8065] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_rgba(122,128,101,0.18)] transition hover:-translate-y-0.5 hover:bg-[#6D735A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Adding Your Songs...
                    </>
                  ) : (
                    <>
                      <Music2 size={16} />
                      Submit My Songs ({selectedSongs.length})
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#7A8065]/20 bg-[#F0F1E9] p-4 text-sm text-[#62694F]">
              <Check size={19} className="mt-0.5 shrink-0" />
              <p>{success}</p>
            </div>
          )}

          {/* Submission error */}
          {submitError && (
            <p className="mt-4 text-center text-sm text-red-600">
              {submitError}
            </p>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#9A8EAA]">
          <Sparkles size={13} />
          <span>Let's make memories together</span>
          <Sparkles size={13} />
        </div>
      </div>
    </section>
  );
}
